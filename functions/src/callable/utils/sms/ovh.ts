import * as ovh from 'ovh'
import { logSmsSent } from '../../../sumologic/sumologic'
import { alert } from '../../alerts/alert'
import { ALERT_OVH_SMS_QUOTA_REACHED } from '../../alerts/alertList'
import * as functions from 'firebase-functions'
import { SMSParams } from '../../interfaces/SMSParams'

export const sendSmsViaOVH = async (params: SMSParams) => {
    if (!params.ovhCredentials) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Config missing for OVH in order to send the SMS'
        )
    }

    const ovhInstance = ovh({
        appKey: params.ovhCredentials.appkey,
        appSecret: params.ovhCredentials.appsecret,
        consumerKey: params.ovhCredentials.consumerkey,
    })

    return ovhInstance
        .requestPromised(
            'POST',
            `/sms/${params.ovhCredentials.servicename}/jobs`,
            {
                message: params.messageBody,
                noStopClause: true,
                receivers: [params.internationalPhoneNumber.replace(' ', '')],
                sender: 'VisioPhone',
                priority: 'high',
                validityPeriod: 30, // 30 min
            }
        )
        .then(() => {
            console.log('SMS sent via OVH')
            logSmsSent('ovh')
        })
        .catch((error: any) => {
            console.error('Fail to send sms', error)
            if (error.error && error.error === 402) {
                alert(ALERT_OVH_SMS_QUOTA_REACHED)
                throw new functions.https.HttpsError(
                    'resource-exhausted',
                    '402'
                )
            }
            throw new functions.https.HttpsError('unknown', error.message)
        })
}

// To get new credentials, we first need to use this method, then open the given url and authentificate manually
// (mind the expiration delay)
//
// const getNewOVHConsumerKey = (ovhInstance:any) => {
//     ovhInstance.requestPromised('POST', '/auth/credential', {
//         'accessRules': [
//             {'method': 'POST', 'path': '/sms/*/jobs'},
//             {'method': 'GET', 'path': '/sms/*/outgoing'},
//             {'method': 'DELETE', 'path': '/sms/*/outgoing/*'}
//         ]
//     }).then((credential: any) => {
//         console.log('auth success, open the url below to validate them', credential)
//     }).catch((error: any) => {
//         console.log('auth error', error)
//     })
// }
