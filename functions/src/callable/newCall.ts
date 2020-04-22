import * as functions from 'firebase-functions'
import { isEmpty } from 'lodash'
import fetch from 'node-fetch'
import { sendEmail, sendSms } from './utils/notification'
import { logRoomCreated } from '../sumologic/sumologic'
import { alert } from './alerts/alert'
import { ALERT_ROOM_NOT_CREATED } from './alerts/alertList'
import * as translations from '../translations.json'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { NotificationParams } from './interfaces/NotificationParams'

const roomExpirationSeconds = 60 * 120 // = 2hr

export const newCall = functions.https.onCall(async (data) => {
    const { ovh, sendgrid, visio, app, twilio } = functions.config()

    if (isEmpty(data) || isEmpty(data.name)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Input parameters are empty'
        )
    }

    if (isEmpty(data.lang)) {
        console.warn('Missing "lang" params')
    }

    if (isEmpty(visio) || isEmpty(visio.apikey) || isEmpty(visio.api)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Config missing for Visio (api/apikey)'
        )
    }

    if (isEmpty(app) || isEmpty(app.domain) || isEmpty(app.emailfrom)) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Config missing for app (domain/emailfrom)'
        )
    }

    if (isEmpty(sendgrid)) {
        console.warn('Warn: No credentials for SendGrid')
    }
    if (isEmpty(ovh)) {
        console.warn('Warn: No credentials for OVH')
    }

    const room = await getRoomUrl(
        {
            apikey: visio.apikey,
            api: visio.api,
        },
        app.domain
    )

    if (!isEmpty(data.name)) {
        await triggerNotification({
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country || 'FR',
            roomUrl: room.roomUrl,
            ovhCredentials: ovh,
            twilioCredentials: twilio,
            sendGridCredentials: sendgrid,
            emailFrom: app.emailfrom,
            lang: data.lang ? data.lang.trim().toLowerCase() : 'en',
        })
    }

    return room
})

interface VisioCredentials {
    apikey: string
    api: string
}

interface Room {
    roomUrl: string
    name: string
    id: string
    privacy: string
    url: string
    created_at: string
    config: any
}

const getRoomUrl = async (
    credentials: VisioCredentials,
    domainName: string
): Promise<Room> => {
    const response = await fetch(credentials.api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.apikey}`,
        },
        body: JSON.stringify({
            properties: {
                enable_screenshare: false,
                lang: 'fr',
                exp: Math.floor(Date.now() / 1000) + roomExpirationSeconds,
            },
        }),
    })
    if (response.ok) {
        const result = await response.json()
        logRoomCreated()
        return {
            roomUrl: `https://${domainName}/visio/${result.name}`,
            ...result,
        }
    }
    await alert(ALERT_ROOM_NOT_CREATED)
    throw new functions.https.HttpsError('resource-exhausted', '400')
}

export const triggerNotification = async (params: NotificationParams) => {
    const name = params.name.replace(/(.{20})..+/, '$1…')
    // @ts-ignore
    const langData = translations[params.lang]
    const subject = `${langData.title} ${params.name}`
    const message = `${name} ${langData.Message} ${params.roomUrl}`

    if (!isEmpty(params.email) && !isEmpty(params.sendGridCredentials)) {
        await sendEmail(params, message, subject)
    }
    if (!isEmpty(params.phone)) {
        const phoneNumber = parsePhoneNumberFromString(
            params.phone,
            params.country as any
        )

        if (!phoneNumber) {
            console.log(
                `Warn: phone number parsing failed, country: ${params.country}`
            )

            throw new functions.https.HttpsError(
                'invalid-argument',
                'Fail to parse the phone number'
            )
        }

        await sendSms({
            messageBody: message,
            internationalPhoneNumber: phoneNumber.formatInternational(),
            twilioCredentials: params.twilioCredentials,
            ovhCredentials: params.ovhCredentials,
        })
    }
}
