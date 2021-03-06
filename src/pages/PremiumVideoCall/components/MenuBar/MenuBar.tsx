/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import EndCallButton from '../Buttons/EndCallButton/EndCallButton'
import FlipCameraButton from './FlipCameraButton/FlipCameraButton'
import Menu from './Menu/Menu'

import useRoomState from '../../hooks/useRoomState/useRoomState'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import { Typography, Grid, Hidden } from '@material-ui/core'
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton'
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton'
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton'
import { showModal } from '../../../../components/Modal/modalAction'
// import InviteParticipants from '../../../../components/InviteParticipants/InviteParticipants'
// import { selectRoomId, selectHostName } from '../../roomSelector'
// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.background.default,
            bottom: 0,
            left: 0,
            right: 0,
            height: `${theme.footerHeight}px`,
            position: 'fixed',
            display: 'flex',
            padding: '0 1.43em',
            zIndex: 10,
            [theme.breakpoints.down('sm')]: {
                height: `${theme.mobileFooterHeight}px`,
                padding: 0,
            },
        },
        screenShareBanner: {
            position: 'fixed',
            zIndex: 10,
            bottom: `${theme.footerHeight}px`,
            left: 0,
            right: 0,
            height: '104px',
            background: 'rgba(0, 0, 0, 0.5)',
            '& h6': {
                color: 'white',
            },
            '& button': {
                background: 'white',
                color: theme.brand,
                border: `2px solid ${theme.brand}`,
                margin: '0 2em',
                '&:hover': {
                    color: '#600101',
                    border: `2px solid #600101`,
                    background: '#FFE9E7',
                },
            },
        },
        hideMobile: {
            display: 'initial',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
    })
)

// const formatRoomName = (roomName) => {
//     return roomName.indexOf('#') ? roomName.split('#')[0] : roomName
// }

export default function MenuBar() {
    const classes = useStyles()
    const { isSharingScreen, toggleScreenShare } = useVideoContext()
    const roomState = useRoomState()
    const dispatch = useDispatch()
    const isReconnecting = roomState === 'reconnecting'
    //TODO show the room name in and before the premium video call screen
    // const { room } = useVideoContext()
    // const roomId = useSelector(selectRoomId)
    // const hostName = useSelector(selectHostName)
    // const roomName = formatRoomName(room.name)

    const showInviteParticipantsModal = () => {
        dispatch(showModal('InviteParticipants'))
    }

    return (
        <>
            {isSharingScreen && (
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.screenShareBanner}>
                    <Typography variant="h6">
                        You are sharing your screen
                    </Typography>
                    <Button onClick={() => toggleScreenShare()}>
                        Stop Sharing
                    </Button>
                </Grid>
            )}
            <footer className={classes.container}>
                <Grid container justify="space-around" alignItems="center">
                    {/* <Hidden smDown>
                        <Grid style={{ flex: 1 }}>
                            <Typography variant="body1">{roomName}</Typography>
                        </Grid>
                    </Hidden> */}
                    <Grid item>
                        <Grid container justify="center">
                            <ToggleAudioButton disabled={isReconnecting} />
                            <ToggleVideoButton disabled={isReconnecting} />
                            <Button onClick={showInviteParticipantsModal}>
                                Add participants
                            </Button>
                            {/* <InviteParticipants
                                roomId={roomId}
                                hostName={hostName}
                            /> */}
                            <Hidden smDown>
                                {!isSharingScreen && (
                                    <ToggleScreenShareButton
                                        disabled={isReconnecting}
                                    />
                                )}
                            </Hidden>
                            <FlipCameraButton />
                        </Grid>
                    </Grid>
                    <Hidden smDown>
                        <Grid style={{ flex: 1, marginRight: '5rem' }}>
                            <Grid container justify="flex-end">
                                <Menu />
                                <EndCallButton />
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </footer>
        </>
    )
}
