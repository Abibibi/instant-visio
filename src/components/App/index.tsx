import React, { useEffect } from 'react'
import './App.scss'
import { gdprHandler } from '../../utils/gdpr'
import Router from './Router'
import { IonApp, IonHeader } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import AppBar from './AppBar/AppBar'
import styled from 'styled-components'
import Snackbar from './Snackbar/Snackbar'
import { PushNotifications } from './PushNotifications/PushNotifications'
import LoginModal from '../LoginModal/LoginModal'
import AuthStateChangedListener from './AuthStateChangedListener/AuthStateChangedListener'
declare global {
    interface Window {
        iv: any
        Cookiebot: any
        $crisp: any
    }
}

const StyledRouter = styled.div`
    margin-top: 1rem;
`

const App = () => {
    useEffect(() => {
        // when using vh and vw units in css:
        // to make sure the height taken into account
        // is the whole window size,
        // not the visible window size
        // (critical on mobile, where, on click on the contact form inputs,
        // the keyboard appears and takes half of the window size,
        // which shrinks the form size - unpleasant user experience)
        if (!window.location.pathname.includes('visio')) {
            setTimeout(() => {
                const viewheight = window.innerHeight
                const viewwidth = window.innerWidth
                const viewport = document.querySelector('meta[name=viewport]')
                viewport?.setAttribute(
                    'content',
                    `height=${viewheight}, width=${viewwidth}, initial-scale=1.0`
                )
            }, 300)
        }

        gdprHandler()
    }, [])

    return (
        <IonApp className="App">
            <PushNotifications />
            <Snackbar />
            <AuthStateChangedListener />
            <LoginModal />
            <IonReactRouter>
                <IonHeader id="topbar">
                    <AppBar />
                </IonHeader>
                <StyledRouter>
                    <Router />
                </StyledRouter>
            </IonReactRouter>
        </IonApp>
    )
}

export default App
