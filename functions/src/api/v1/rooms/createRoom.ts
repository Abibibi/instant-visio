import { Request, Response } from 'express'
import { addRoom } from '../../../db/addRoom'
import { createTwilioRoom } from './service/createTwilioRoom'
import { updateRoom } from '../../../db/updateRoom'
import { NewRoomResponse } from '../../../types/NewRoomResponse'
import { wrap } from 'async-middleware'
import { UID } from '../../../types/uid'
import { setRoom } from '../../../db/setRoom'
import { assertNewRoomCreationGranted } from '../subscription/assertNewRoomCreationGranted'
import { RoomId } from '../../../types/Room'
import { firestore } from 'firebase-admin/lib/firestore'
import Timestamp = firestore.Timestamp

/**
 * @swagger
 * /v1/rooms/new:
 *   post:
 *     description: Create a new room. This will generate a random room id (9 random a-Z 0-9 chat) and a random password if none provided. The room will have an infinite lifetime though it will probably change in the future. <br/><br/>To schedule a room, use this route and set the startTimestamp field, it will not prevent the meeting to start before of after and will be used to fill the date on the UI & reminders.
 *     tags:
 *       - rooms
 *     consumes:
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *       - name: password
 *         description: (optional) The room password. If no password, a random one will be generated.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: string
 *       - name: startAt
 *         description: (optional) The UTC timestamp in seconds at which the meeting is scheduled to start. If not set, it will be the current time.
 *         in: x-www-form-urlencoded
 *         required: false
 *         type: integer
 *     responses:
 *       201:
 *         description: Room created with success
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   roomSid: "aZxo2xskIaZxo2xskI",
 *                   roomId: "390FJZDms390FJZDms"
 *               }
 *       401:
 *         description: missing authorization bearer token
 *       403:
 *         description: authorization header present but not valid
 *       412:
 *         description: authorization header present but not formatted correctly
 */
export const createRoomRoute = wrap(async (req: Request, res: Response) => {
    const newRoomResponse = await createRoom(
        res.locals.uid,
        req.body.password,
        undefined,
        req.body.startAt
    )
    res.send(newRoomResponse)
})

export const createRoom = async (
    userId: UID,
    roomRequestedPassword?: string,
    specificRoomId?: RoomId,
    startAt?: string
): Promise<NewRoomResponse> => {
    await assertNewRoomCreationGranted(userId)

    let roomId: RoomId
    const roomPassword =
        roomRequestedPassword || `${~~(Math.random() * 999999)}`
    const roomStartAt = Timestamp.fromMillis(
        startAt ? parseInt(startAt) * 1000 : ~~(Date.now() / 1000)
    )

    if (specificRoomId) {
        roomId = await setRoom(
            userId,
            specificRoomId,
            roomPassword,
            roomStartAt
        )
    } else {
        roomId = await addRoom(userId, roomPassword, roomStartAt)
    }

    const roomSid = await createTwilioRoom(roomId)
    await updateRoom({
        roomId,
        roomSid,
    })
    return {
        roomId,
        roomSid,
    }
}
