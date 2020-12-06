export type InvitationLangs =
    | 'en'
    | 'fr'
    | 'de'
    | 'es'
    | 'ro'
    | 'hu'
    | 'it'
    | 'gr'

export interface InvitationDestination {
    email?: string
    phone?: string
    lang: InvitationLangs
    country: string
}