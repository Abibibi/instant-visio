// tslint:disable-next-line
import '../../testUtils/mockFirebaseAdminAndFunctions'
import { firestoreGet } from '../../testUtils/firestoreStub'

import { authenticateJWTMiddleware } from './authenticateJWTMiddleware'
import {
    ForbiddenError,
    PreconditionFailedError,
    UnauthorizedError,
} from '../errors/HttpError'

const DEFAULT_RES = {
    locals: {},
}
describe('authentificateJWTMiddleware', () => {
    const mockNext = jest.fn()
    let mockRes = DEFAULT_RES

    afterEach(() => {
        mockNext.mockClear()
        mockRes = DEFAULT_RES
    })

    it('should not be authorized due to missing authorization header', () => {
        expect(() => {
            authenticateJWTMiddleware(
                {
                    headers: {},
                } as any,
                mockRes as any,
                mockNext
            )
        }).toThrowError(UnauthorizedError)
    })

    it('should not be authorized due to authorization header wrongly formatted', () => {
        expect(() => {
            authenticateJWTMiddleware(
                {
                    headers: {
                        authorization: 'Bearer',
                    },
                } as any,
                mockRes as any,
                mockNext
            )
        }).toThrowError(PreconditionFailedError)
    })

    it('should not be authorized due to token wrongly formatted', () => {
        authenticateJWTMiddleware(
            {
                headers: {
                    authorization: 'Bearer THIS_IS_NOT.A_REAL.TOKEN',
                },
            } as any,
            mockRes as any,
            mockNext
        )
        expect(mockNext.mock.calls).toHaveLength(1)
        expect(mockNext.mock.calls[0][0]).toBeInstanceOf(ForbiddenError)
        expect(mockNext.mock.calls[0][0].message).toBe(
            'Unable to verify the JWT Token'
        )
    })

    it('should not be authorized because token is not valid in database', (done) => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2OSIsImlhdCI6MTUxNjIzOTAyMn0.MboZ1PQYeouu9wnxfYrnk2XnPAgQBcL177e7bNbBMr0'

        const snapshot = {
            data: () => ({
                tokens: {
                    [token]: {
                        valid: false,
                    },
                },
            }),
            exists: true,
        }
        firestoreGet.mockImplementation(() => Promise.resolve(snapshot))

        const mockNextWithDone = (params: any) => {
            expect(params.message).not.toBe('Unable to verify the JWT Token')
            done()
        }

        authenticateJWTMiddleware(
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            } as any,
            mockRes as any,
            mockNextWithDone
        )
    })

    it('should be authorized', (done) => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2OSIsImlhdCI6MTUxNjIzOTAyMn0.MboZ1PQYeouu9wnxfYrnk2XnPAgQBcL177e7bNbBMr0'

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

        const mockNextWithDone = (params: any) => {
            expect(params).toBeUndefined()
            done()
        }

        authenticateJWTMiddleware(
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            } as any,
            mockRes as any,
            mockNextWithDone
        )
    })
})
