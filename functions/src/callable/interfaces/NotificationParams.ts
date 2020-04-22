import { OVHCredentials } from './OVHCredentials'
import { TwilioCredentials } from './TwilioCredentials'

export interface NotificationParams {
    name: string
    email: string
    phone: string
    roomUrl: string
    country: string
    emailFrom: string
    lang: string
    ovhCredentials: OVHCredentials
    twilioCredentials: TwilioCredentials
    sendGridCredentials: {
        apikey: string
    }
}
