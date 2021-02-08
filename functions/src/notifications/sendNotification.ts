import * as translations from '../translations.json'
import {
    BaseNotificationParams,
    EmailNotificationParams,
    NotificationFormatType,
    NotificationType,
    PushNotificationParams,
    SmsNotificationParams,
} from '../types/Notification'
import { sendEmail } from './sendEmail'
import { sendSms } from './sendSMS'
import { sendPush } from './sendPush'
import { DateTime } from 'luxon'
import { InternalServerError } from '../api/errors/HttpError'

export const sendNotification = async (
    params:
        | SmsNotificationParams
        | EmailNotificationParams
        | PushNotificationParams
) => {
    const { subject, message } = getContent(params)
    if (params.type === NotificationType.EmailNotificationType) {
        await sendEmail(params, message, subject)
    }
    if (params.type === NotificationType.SmsNotificationType) {
        await sendSms(params, message)
    }
    if (params.type === NotificationType.PushNotificationType) {
        await sendPush(params, message, subject)
    }
}

export const getContent = (
    params: BaseNotificationParams
): {
    subject: string
    message: string
} => {
    const name = params.name.replace(/(.{20})..+/, '$1…')
    const lang = params.lang || 'fr'
    switch (params.formatType) {
        case NotificationFormatType.Scheduled: {
            if (!params.roomStartAt) {
                throw new InternalServerError(
                    `Trying to send a reminder without a startAt, id: ${params.roomUrl}`
                )
            }
            if (!params.timezone) {
                throw new InternalServerError(
                    `Trying to send a reminder without a timezone, id: ${params.roomUrl}`
                )
            }
            // @ts-ignore
            const langData = translations.scheduled[lang]
            const date = DateTime.fromJSDate(params.roomStartAt.toDate())
                .setZone(params.timezone)
                .setLocale(lang)
                .toLocaleString({
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })
            const message = langData.Message.replace('{NAME}', name)
                .replace('{DATE}', date)
                .replace('{URL}', params.roomUrl)
            return {
                subject: `${langData.title} ${params.name}`,
                message,
            }
        }
        default:
        case NotificationFormatType.Now: {
            // @ts-ignore
            const langData = translations.now[lang]
            const subject = `${langData.title} ${params.name}`
            const message = `${name} ${langData.Message} ${params.roomUrl}`
            return {
                subject,
                message,
            }
        }
    }
}
