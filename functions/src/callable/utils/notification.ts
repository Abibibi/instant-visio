import * as sgMail from '@sendgrid/mail'
import { logEmailSent } from '../../sumologic/sumologic'
import { sendSmsViaOVH } from './sms/ovh'
import { sendSmsViaTwilio } from './sms/twilio'
import * as functions from 'firebase-functions'
import { isEmpty } from 'lodash'
import { NotificationParams } from '../interfaces/NotificationParams'
import { SMSParams } from '../interfaces/SMSParams'

export const sendEmail = async (
    params: NotificationParams,
    messageBody: string,
    subject: string
) => {
    sgMail.setApiKey(params.sendGridCredentials.apikey)
    const msg = {
        to: params.email,
        from: `InstantVisio <${params.emailFrom}>`,
        subject: subject,
        text: messageBody,
    }

    try {
        const result = await sgMail.send(msg)
        const response = result && result[0]
        if (response.statusCode > 200 && response.statusCode < 400) {
            logEmailSent()
            return Promise.resolve()
        }
        console.log(
            `Fail to send email for room ${params.roomUrl}`,
            response.statusCode,
            response.statusMessage,
            response.body
        )
    } catch (err) {
        console.error(err)
    }
    return Promise.reject('Failed to send email')
}

export const sendSms = (params: SMSParams) => {
    const ovhCredentialsOk = !isEmpty(params.ovhCredentials)
    const twilioCredentialsOk = !isEmpty(params.twilioCredentials)

    if (ovhCredentialsOk) {
        return sendSmsViaOVH(params).catch((error) => {
            if (error.code === 'resource-exhausted' && twilioCredentialsOk) {
                console.warn('OVH SMS Exhausted, fallbacking to twilio')
                return sendSmsViaTwilio(params)
            }
            return error
        })
    }

    if (twilioCredentialsOk) {
        return sendSmsViaTwilio(params)
    }

    throw new functions.https.HttpsError(
        'failed-precondition',
        'Config missing for OVH or Twilio in order to send the SMS'
    )
}
