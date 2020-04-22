export const ALERT_ROOM_NOT_CREATED = {
    message: 'Daily.co room not created',
    alias: 'dailyco-room-not-created',
    description:
        'The Daily.co API did not return a new room when asking for this. This prevent user from using the application.',
    tags: ['OverwriteQuietHours', 'Critical', 'dailyco'],
    priority: 'P1',
}

export const ALERT_OVH_SMS_QUOTA_REACHED = {
    message: 'OVH SMS Quota reached',
    alias: 'sms-ovh-quota-reached',
    description: "We don't have any more credit on ovh, sms was not delivered",
    tags: ['OverwriteQuietHours', 'Critical', 'sms'],
    priority: 'P1',
}

export const ALERT_TWILIO_SMS_OTHER = {
    message: 'TWILIO SMS Error',
    alias: 'sms-twilio-error',
    description: 'Something not expected happened on Twilio: ',
    tags: ['OverwriteQuietHours', 'Critical', 'sms'],
    priority: 'P1',
}
