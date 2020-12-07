import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DefaultLayout from 'src/layout/Default/Default'
import { IonContent } from '@ionic/react'
import { Redirect, Link } from 'react-router-dom'
import * as LocalStorage from 'src/services/local-storage'
import styled from 'styled-components'

const CenteredText = styled.div`
    text-align: center;
`

const JoinVideoCall = () => {
    const { t } = useTranslation('join-last-call')
    const [lastVideoCallId, setLastVideoCallId] = useState<string | null>()

    useEffect(() => {
        const getCallId = async () => {
            const videoCallId = await LocalStorage.getLastVideoCallId()
            if (videoCallId) {
                setLastVideoCallId(videoCallId)
            }
        }

        getCallId()
    }, [setLastVideoCallId])

    return (
        <IonContent>
            {lastVideoCallId ? (
                <Redirect to={`/visio/${lastVideoCallId}`} />
            ) : (
                <DefaultLayout title="not-used-here">
                    <CenteredText>
                        <h2>{`${t('page-title')}`}</h2>
                        <p>{t('page-content')}</p>
                        <Link to="/">{t('link-back-to-home')}</Link>
                    </CenteredText>
                </DefaultLayout>
            )}
        </IonContent>
    )
}

export default JoinVideoCall
