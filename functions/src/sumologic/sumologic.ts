import fetch from 'node-fetch'
import * as functions from 'firebase-functions'

export const logRoomCreated = () => {
    sendLog({
        roomCreated: 1,
    })
}

export const logRoomJoined = () => {
    sendLog({
        roomJoined: 1,
    })
}

export const logEmailSent = () => {
    sendLog({
        emailSent: 1,
    })
}

export const logSmsSent = () => {
    sendLog({
        smsSent: 1,
    })
}

export const logCallRating = (rating: number) => {
    sendLog({
        callRating: rating,
    })
}

const sendLog = (data: { [key: string]: number | string }) => {
    const { sumologic } = functions.config()
    if (!sumologic || !sumologic.collector) {
        console.warn('No sumologic collector configured')
        return
    }

    fetch(sumologic.collector, {
        method: 'POST',
        body: JSON.stringify(data),
    }).catch((error) => {
        console.log('Failed to send sumologic log', error)
    })
}
