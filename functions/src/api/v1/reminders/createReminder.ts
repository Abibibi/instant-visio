import { Request, Response } from 'express'
import { wrap } from 'async-middleware'
import { assertRightToEditRoom } from '../../../db/assertRightsToEditRoom'
import { BadRequestError } from '../../errors/HttpError'
import { isDestinationsCorrectlyFormatted } from '../utils/isDestinationsCorrectlyFormatted'
import { ReminderDao } from '../../../db/ReminderDao'
import { Timestamp } from '../../../firebase/firebase'
import { assertTimestampInFuture } from './assertTimestampInFuture'
import { RoomId } from '../../../types/Room'
import { UID } from '../../../types/uid'
import { ReminderId } from '../../../types/Reminder'
import { JSONParse } from '../utils/JSONParse'

/**
 * @swagger
 * /v1/rooms/{roomId}/reminders/:
 *   post:
 *     description: Create a new reminder. A reminder is composed of a send timestamp as well as multiple destination(s) (sms and/or emails).
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: hostName
 *         description: The name or organisation which sent the invite(s)
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: string
 *       - name: sendAt
 *         description: The UTC timestamp in seconds at which the reminder is scheduled to be sent.
 *         in: x-www-form-urlencoded
 *         required: true
 *         type: integer
 *       - name: destinations
 *         description: An array of destinations
 *         in: x-www-form-urlencoded
 *         required: true
 *         examples:
 *            mixed:
 *                summary: Mixed email, sms and languages
 *                $ref: '#/components/examples/Destinations'
 *         schema:
 *            type: string
 *         items:
 *            $ref: '#/components/schemas/Destination'
 *     responses:
 *       201:
 *         description: Reminder created with success
 *         content:
 *           application/json:
 *             example: {
 *               reminderId: "aZxo2xskIaZxo2xskI"
 *             }
 *       400:
 *         description: request content (x-www-form-urlencoded) not correct
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const createReminderRoute = wrap(async (req: Request, res: Response) => {
    const userId = res.locals.uid
    const roomId = req.params.roomId
    const { hostName, destinations, sendAt } = req.body

    const reminderId = await createReminder({
        roomId,
        userId,
        hostName,
        sendAtSeconds: sendAt,
        destinationsParameter: destinations,
    })

    res.send({
        reminderId,
    })
})

export const createReminder = async ({
    roomId,
    userId,
    sendAtSeconds,
    hostName,
    destinationsParameter,
}: {
    roomId: RoomId
    userId: UID
    sendAtSeconds: string
    hostName: string
    destinationsParameter: string
}): Promise<ReminderId> => {
    await assertRightToEditRoom(roomId, userId)

    const sendAtMillis = parseInt(sendAtSeconds) * 1000
    const destinations = JSONParse(destinationsParameter || '[]')

    if (
        !sendAtMillis ||
        !hostName ||
        !isDestinationsCorrectlyFormatted(destinations)
    ) {
        throw new BadRequestError('Request body not formatted correctly')
    }

    const sendAtTimestamp = Timestamp.fromMillis(sendAtMillis)
    assertTimestampInFuture(sendAtTimestamp)

    return await ReminderDao.add(
        roomId,
        sendAtTimestamp,
        destinations,
        hostName
    )
}
