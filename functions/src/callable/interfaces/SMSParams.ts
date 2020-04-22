import { OVHCredentials } from './OVHCredentials'
import { TwilioCredentials } from './TwilioCredentials'

export interface SMSParams {
    messageBody: string
    internationalPhoneNumber: string
    ovhCredentials?: OVHCredentials
    twilioCredentials?: TwilioCredentials
}
