import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DailyIframe from '@daily-co/daily-js'
import { useTranslation } from 'react-i18next'

import dailyCssText from './dailyCssText'
import { CallContainer } from './VideoCallComponents'
import Fullscreen from '../../components/Fullscreen'
import sendCallLogs from '../../actions/sendCallLogs'
import Footer from '../../components/Footer'
import { hideSupport, setVideoCallExited } from '../../utils/support'
import Controls from './Controls'
import VideoCallFrame from './VideoCallFrame'

const VideoCallPage = () => {
    const { t } = useTranslation('videocall')

    const [camOn, setCamOn] = useState(true)
    const [audioOn, setAudioOn] = useState(true)
    const [participantStatus, setParticipantStatus] = useState('')
    const [participantNumber, setParticipantNumber] = useState(0)
    const [leftCallFrame, setLeftCallFrame] = useState(false)
    const { videoName } = useParams()

    const url = `https://instantvisio.daily.co/${videoName}`

    const videoFrame = useRef(null)
    const dailyRef = useRef(null)

    const cameraClick = () => {
        if (!dailyRef.current) return
        dailyRef.current.setLocalVideo(!dailyRef.current.localVideo())
    }
    const audioClick = () => {
        if (!dailyRef.current) return
        dailyRef.current.setLocalAudio(!dailyRef.current.localAudio())
    }
    const onLeaveClick = () => {
        if (!dailyRef.current) return

        dailyRef.current.leave()
        setVideoCallExited()
        setLeftCallFrame(true)
    }

    useEffect(() => {
        if (dailyRef.current) {
            return
        }
        dailyRef.current = DailyIframe.wrap(videoFrame.current, {
            customLayout: true,
        })

        dailyRef.current.join({
            url,
            cssText: dailyCssText,
        })
        hideSupport()

        const roomLogsToSend = (event) => {
            // noinspection JSIgnoredPromiseFromCall
            sendCallLogs(videoName, event)
        }

        const eventActions = (event) => {
            // noinspection JSIgnoredPromiseFromCall
            sendCallLogs(videoName, event)

            setCamOn(dailyRef.current.localVideo())
            setAudioOn(dailyRef.current.localAudio())

            const participantsLength = Object.keys(
                dailyRef.current.participants()
            ).length

            if (participantsLength === 2 && event && !event.participant.local) {
                setParticipantStatus(
                    !event.participant.video ? t('participant-cam-off') : ''
                )
            } else if (participantsLength > 2) {
                setParticipantStatus('')
            } else if (participantsLength < 2) {
                setParticipantStatus(t('waiting-participant'))
            }

            setParticipantNumber(participantsLength)
        }

        dailyRef.current
            .on('loading', roomLogsToSend)
            .on('loaded', eventActions)
            .on('started-camera', roomLogsToSend)
            .on('camera-error', roomLogsToSend)
            .on('active-speaker-change', roomLogsToSend)
            .on('active-speaker-mode-change', roomLogsToSend)
            .on('error', roomLogsToSend)
            .on('joined-meeting', eventActions)
            .on('participant-joined', eventActions)
            .on('participant-updated', eventActions)
            .on('network-connection', roomLogsToSend)
            .on('participant-left', (event) => {
                // noinspection JSIgnoredPromiseFromCall
                sendCallLogs(videoName, event)
                setParticipantStatus(
                    !event.participant.local &&
                        Object.keys(dailyRef.current.participants()).length < 2
                        ? t('participant-left')
                        : ''
                )
            })
            .on('left-meeting', roomLogsToSend)

        const leavingCallPage = (event) => {
            // Ask the browser to confirm exiting the call
            event.preventDefault()
            event.returnValue = ''
        }

        window.addEventListener('beforeunload', leavingCallPage)

        return () => {
            window.removeEventListener('beforeunload', leavingCallPage)
        }
    }, [url, t, videoName])

    return (
        <>
            <CallContainer>
                <Fullscreen />
                <VideoCallFrame
                    participantsNumber={participantNumber}
                    participantStatus={participantStatus}
                    hasLeft={leftCallFrame}
                    micOn={audioOn}
                    videoFrame={videoFrame}
                />

                {!leftCallFrame && (
                    <Controls
                        camOn={camOn}
                        onCamClick={cameraClick}
                        micOn={audioOn}
                        onMicClick={audioClick}
                        onLeaveClick={onLeaveClick}
                    />
                )}
            </CallContainer>

            {leftCallFrame && <Footer />}
        </>
    )
}

export default VideoCallPage
