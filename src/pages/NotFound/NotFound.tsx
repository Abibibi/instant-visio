import React from 'react'
import { useTranslation } from 'react-i18next'
import DefaultLayout from 'src/layout/Default/Default'
import { Link } from 'react-router-dom'
import { IonContent } from '@ionic/react'

export default function NotFound() {
    const { t } = useTranslation('not-found')

    return (
        <IonContent>
            <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
                <h2>{t('page-content')}</h2>
                <Link to="/">{t('link-back-to-home')}</Link>
            </DefaultLayout>
        </IonContent>
    )
}
