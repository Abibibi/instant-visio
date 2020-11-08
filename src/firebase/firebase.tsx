import firebase from 'firebase/app'

import 'firebase/functions'
import 'firebase/remote-config'

const firebaseConfig = {
    appId: process.env.REACT_APP_APPID,
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

export const remoteConfig = firebase.remoteConfig()
remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
    fetchTimeoutMillis: 60000, // default value used here: https://firebase.google.com/docs/reference/js/firebase.remoteconfig.Settings#fetchtimeoutmillis
}

if (process.env.NODE_ENV === 'development') {
    firebase.functions().useFunctionsEmulator('http://localhost:5000')
}

export const functions = {
    newCall: firebase.functions().httpsCallable('newCall'),
}
