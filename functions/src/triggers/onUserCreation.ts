import * as functions from 'firebase-functions'
import * as jsonWebToken from 'jsonwebtoken'
import { getJWTEnv } from '../firebase/env'
import { UserDao } from '../db/UserDao'
import { SUBSCRIPTIONS, TEST_ACCOUNTS } from '../db/constants'
import * as admin from 'firebase-admin'
import { isUsingEmulator } from '../api/utils/isUsingEmulator'
import { UID } from '../types/uid'

const makeUserData = (
    isSubscriptionActive: boolean,
    isQuotaReached: boolean
) => ({
    subscription: {
        isActive: isSubscriptionActive,
        isQuotaReached,
        type: SUBSCRIPTIONS.manual,
        quotas: {
            sms: 100,
            email: 100,
            push: 100,
            minutes: 10000,
        },
    },
    usage: {
        sentSMSs: 0,
        sentEmails: 0,
        sentPushs: 0,
    },
})

const getUserData = (user: admin.auth.UserRecord) => {
    let userData
    if (isUsingEmulator()) {
        switch (user.email) {
            case TEST_ACCOUNTS.paidUser.email:
                userData = makeUserData(true, false)
                break
            case TEST_ACCOUNTS.unpaidUser.email:
                userData = makeUserData(false, false)
                break
            case TEST_ACCOUNTS.overQuotaUser.email:
                userData = makeUserData(true, true)
                break
            default:
                // anonymous login case
                userData = makeUserData(false, false)
                break
        }
    } else {
        userData = makeUserData(false, false)
    }

    return userData
}

export const onUserCreation = functions.auth.user().onCreate(async (user) => {
    const { uid } = user

    await generateNewTokenToUser(uid)
    await UserDao.update(uid, getUserData(user))

    return user
})

export const generateNewTokenToUser = async (userId: UID): Promise<string> => {
    const jwtKey = getJWTEnv()
    const newJWTToken = jsonWebToken.sign({ userId }, jwtKey, {
        algorithm: 'HS256',
    })

    await UserDao.addToken(userId, newJWTToken)
    return newJWTToken
}
