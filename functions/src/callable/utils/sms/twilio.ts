import { SMSParams } from '../../interfaces/SMSParams'
import * as functions from 'firebase-functions'
import * as twilio from 'twilio'
import { alert } from '../../alerts/alert'
import { ALERT_TWILIO_SMS_OTHER } from '../../alerts/alertList'
import { logSmsSent } from '../../../sumologic/sumologic'

export const sendSmsViaTwilio = async (params: SMSParams) => {
    if (!params.twilioCredentials) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Config missing for Twilio in order to send the SMS'
        )
    }

    const twilioClient = twilio(
        params.twilioCredentials.sid,
        params.twilioCredentials.authtoken
    )

    return twilioClient.messages
        .create({
            body: params.messageBody,
            from: params.twilioCredentials.fromnumber,
            to: params.internationalPhoneNumber,
        })
        .then((message: any) => {
            switch (message.status) {
                case 'sent':
                    console.log('SMS sent via twilio')
                    logSmsSent('twilio')
                    break
                case 'failed':
                case 'undelivered':
                    console.warn('Failed to send SMS via twilio')
                    const error = ALERT_TWILIO_SMS_OTHER
                    switch (message.error_code) {
                        case 30001:
                        case 30002:
                        case 30008:
                        case 30010:
                            error.message += `${message.error_message} ${message.error_code}`
                            error.alias += `${message.error_message}-${message.error_code}`
                            alert(error)
                            break
                        default:
                            console.warn(
                                `Reason: status:${message.status} error_message:${message.error_message} error_code:${message.error_code}`
                            )
                    }
                    throw new functions.https.HttpsError('internal', '400')
                default:
                    console.log(
                        `SMS Twilio result in: what??? ${message.status}`
                    )
                    break
            }
        })
}
