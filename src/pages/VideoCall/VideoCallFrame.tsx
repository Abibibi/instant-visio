import React from 'react'
import { IframeContainer } from './VideoCallComponents'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import * as LocalStorage from '../../services/local-storage'
import Card from '../../components/Card/Card'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Rating from '@material-ui/lab/Rating'
import { addCallRating } from '../../actions/addCallRating'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    },
    help: {
        fontSize: 20,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
            marginLeft:30,
            marginRight:30
        },
        textAlign: 'center',
        color: 'white'
    }
}))

const StyledRating = withStyles({
    iconFilled: {
      color: 'white',
    },
    iconHover: {
      color: '#724BDD',
    },
  })(Rating);

const VideoCallFrame = ({
    participantsNumber,
    participantStatus,
    hasLeft,
    camOn,
    videoFrame,
}) => {
    const { t } = useTranslation('videocall')
    const [redirectToRoot, setRedirectToRoot] = React.useState(false)
    const [value, setValue] = React.useState<number | null>(0)
    const classes = useStyles()
    
    const onChange = (_, value) => {
        setValue(value)
        value && addCallRating(value)
    }  

    if (hasLeft) {
        LocalStorage.removeLastVideoCallId()
    }

    return (
        <IframeContainer>
            {!hasLeft && (
                <iframe
                    className="iframe"
                    title="video call iframe"
                    ref={videoFrame}
                    allow="microphone; camera; autoplay"
                    allowFullScreen
                />
            )}
            {!camOn && !hasLeft && (
                <div
                    className={classNames({
                        'mute-camera': true,
                        'mute-camera-two': participantsNumber < 3,
                        'mute-camera-three': participantsNumber === 3,
                        'mute-camera-four': participantsNumber === 4,
                    })}>
                    {t('turn-on-cam-message')}
                </div>
            )}

            {!hasLeft && (
                <div className="waiting-participant">{participantStatus}</div>
            )}

            {redirectToRoot && <Redirect to="/" />}

            {hasLeft && (
                <div>
                    <Grid
                        container
                        justify="center"
                        alignItems="center">
                    <Card 
                        title={t('leave-title-card')} 
                        messageOne={t('leave-messageOne-card')} 
                        messageTwo={t('leave-messageTwo-card')} 
                        labelBtnNewCall={t('leave-labelBtnNewCall-card')}
                        onClick={(val) => setRedirectToRoot(val)} 
                    />
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        >
                        <Typography
                            className={classes.help}
                            variant="h5"
                            component="h6">
                            {t('leave-help-us-message')}
                        </Typography>
                    <Grid container justify="center" alignItems="center">
                        <StyledRating
                            name="instantvisio-feedback"
                            value={value}
                            precision={1}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
                </div>
            )}
        </IframeContainer>
    )
}

export default VideoCallFrame
