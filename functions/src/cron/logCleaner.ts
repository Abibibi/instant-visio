import * as functions from 'firebase-functions'
import * as ovh from 'ovh'
import { isEmpty } from 'lodash'
import { OVHCredentials } from '../types/OVHCredentials'

export const logCleaner = functions
    .runWith({
        timeoutSeconds: 540,
        memory: '2GB',
    })
    .pubsub // Every day at 03:00 CET
    .schedule('0 3 * * *')
    .onRun(async () => {
        const { ovh } = functions.config()

        if (isEmpty(ovh)) {
            console.warn('Warn: No credentials for OVH')
        } else {
            await cleanupOVHLogs(ovh)
        }

        return null
    })
//
// export const logCleanerDev = functions.https.onRequest(async (req, res) => {
//
//     const {sendgrid} = functions.config()
//
//     if (isEmpty(sendgrid)) {
//         console.warn("Warn: No credentials for OVH")
//     } else {
//         await cleanupSendgrid(sendgrid)
//     }
//
//     res.send('ok')
// })

const cleanupOVHLogs = async (ovhCredentials: OVHCredentials) => {
    const ovhInstance = ovh({
        appKey: ovhCredentials.appKey,
        appSecret: ovhCredentials.appSecret,
        consumerKey: ovhCredentials.consumerKey,
    })

    return await ovhInstance
        .requestPromised('GET', `/sms/${ovhCredentials.serviceName}/outgoing`)
        .then(async (ids: string[]) => {
            for (const id of ids) {
                await ovhInstance.requestPromised(
                    'DELETE',
                    `/sms/${ovhCredentials.serviceName}/outgoing/${id}`
                )
            }
            console.log('OVH Cleaned')
        })
        .catch((error: any) => {
            console.log(error)
        })
}
