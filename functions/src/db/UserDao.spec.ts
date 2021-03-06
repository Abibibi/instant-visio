// tslint:disable-next-line
import '../testUtils/mockFirebaseAdminAndFunctions'
import { JWTData } from '../types/JWT'
import { firestoreGet } from '../testUtils/firestoreStub'
import { UserDao } from './UserDao'

describe('isTokenValidInDb', () => {
    const token = 'tokenValue'
    const jwtData: JWTData = {
        uid: '69',
        iat: 1544455,
    }

    it('should return true if everything is ok', async () => {
        const snapshot = {
            data: () => ({
                tokens: {
                    [token]: {
                        valid: true,
                    },
                },
            }),
            exists: true,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        const result = await UserDao.isTokenValid(jwtData.uid, token)
        expect(result).toBeTruthy()
    })

    it('should return false if nothing in db', async () => {
        const snapshot = {
            data: () => ({}),
            exists: false,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        const result = await UserDao.isTokenValid(jwtData.uid, token)
        expect(result).toBeFalsy()
    })
    it('should return false if token is not existing in db', async () => {
        const snapshot = {
            data: () => ({
                tokens: {
                    anotherToken: {
                        valid: true,
                    },
                },
            }),
            exists: true,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        const result = await UserDao.isTokenValid(jwtData.uid, token)
        expect(result).toBeFalsy()
    })
    it('should return false if token exist in db but is no longer valid', async () => {
        const snapshot = {
            data: () => ({
                tokens: {
                    anotherToken: {
                        valid: false,
                    },
                },
            }),
            exists: true,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        const result = await UserDao.isTokenValid(jwtData.uid, token)
        expect(result).toBeFalsy()
    })
})
