import React, { useEffect } from 'react'

export const STATE_WAITING = 0
export const STATE_GRANTED = 1
export const STATE_DENIED = 2

export default function useCameraMicrophonePermission(name) {
    const [result, setResult] = React.useState(STATE_WAITING)
    useEffect(() => {
        const constraints = {
            video: true,
            audio: true,
        }

        navigator.getUserMedia &&
            navigator.getUserMedia(
                constraints,
                function () {
                    setResult(STATE_GRANTED)
                },
                function (err) {
                    console.log('err', err)
                    setResult(STATE_DENIED)
                }
            )

        navigator.mediaDevices.getUserMedia &&
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(() => {
                    setResult(STATE_GRANTED)
                })
                .catch((error) => {
                    console.log(error)
                    setResult(STATE_DENIED)
                })
    }, [name])
    return result
}