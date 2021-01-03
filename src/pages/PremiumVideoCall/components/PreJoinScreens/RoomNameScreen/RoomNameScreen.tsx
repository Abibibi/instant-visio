/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import React, { ChangeEvent, FormEvent } from 'react'
import {
    Typography,
    makeStyles,
    TextField,
    Grid,
    Button,
    InputLabel,
    Theme,
} from '@material-ui/core'
import { useAppState } from '../../../state'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../../../components/App/userSelector'

const useStyles = makeStyles((theme: Theme) => ({
    gutterBottom: {
        marginBottom: '1em',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1.5em 0 3.5em',
        '& div:not(:last-child)': {
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '1.5em 0 2em',
        },
    },
    textFieldContainer: {
        width: '100%',
    },
    continueButton: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}))

interface RoomNameScreenProps {
    name: string
    roomName: string
    setName: (name: string) => void
    setRoomName: (roomName: string) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function RoomNameScreen({
    name,
    roomName,
    setName,
    setRoomName,
    handleSubmit,
}: RoomNameScreenProps) {
    const classes = useStyles()
    const { user } = useAppState()
    const token = useSelector(selectToken)
    const disableButtons = !name || !roomName || !token

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    //TODO show the room name in and before the premium video call screen
    // const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setRoomName(event.target.value)
    // }

    const hasUsername =
        !window.location.search.includes('customIdentity=true') &&
        user?.displayName

    return (
        <>
            <Typography variant="h5" className={classes.gutterBottom}>
                Rejoindre une visio de groupe
            </Typography>
            <Typography variant="body1">
                {hasUsername
                    ? "Enter the name of a room you'd like to join."
                    : "Enter your name and the name of a room you'd like to join"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputContainer}>
                    {!hasUsername && (
                        <div className={classes.textFieldContainer}>
                            <InputLabel shrink htmlFor="input-user-name">
                                Votre nom
                            </InputLabel>
                            <TextField
                                id="input-user-name"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                    )}
                    {/* <div className={classes.textFieldContainer}>
                        <InputLabel shrink htmlFor="input-room-name">
                            Votre Réunion de Groupe
                        </InputLabel>
                        <TextField
                            autoCapitalize="false"
                            id="input-room-name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={roomName}
                            onChange={handleRoomNameChange}
                        />
                    </div> */}
                </div>
                <Grid container justify="flex-end">
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={disableButtons}
                        className={classes.continueButton}>
                        Continue
                    </Button>
                </Grid>
            </form>
        </>
    )
}
