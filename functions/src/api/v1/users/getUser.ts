import { Request, Response } from 'express'
import { ForbiddenError } from '../../errors/HttpError'
import { UserDao } from '../../../db/UserDao'

/**
 * @swagger
 * /v1/users/{userId}:
 *   get:
 *     description: Get user details, subscription and quota status. This will not send any payment details or API keys.
 *     tags: ['users']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             example: {
 *               id: 'vXIUuaGkH4kukbwRH5cU',
 *               updatedAt: 1605969562,
 *               subscription: {
 *                   isActive: true,
 *                   isQuotaReached: false
 *               },
 *               usage: {
 *                  sentEmails: 1,
 *                  sentSMSs: 2
 *               }
 *             }
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: invalid authorization header
 *       412:
 *         description: authorization header wrong format
 */
export const getUser = async (req: Request, res: Response) => {
    const currentUid = res.locals.uid
    const requestedUserId = req.params.userId

    if (requestedUserId !== currentUid) {
        throw new ForbiddenError('Not authorized to get this resource')
    }

    const user = await UserDao.get(currentUid)

    res.send({
        user: {
            id: user.id,
            subscription: user.subscription,
            usage: user.usage,
            updatedAt: user.updatedAt?.seconds,
        },
    })
}
