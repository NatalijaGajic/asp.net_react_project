import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'
import Controls from './controls/Controls'

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2)
    },
    dialogTitle:{
        padding:'0px'
    }
    
}))

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

    return (
        //https://youtu.be/m-2_gb_3L7Q?list=PLvxmjtOyYtKeX7S098QNGZymWp3nkuo6b&t=12658
        <Dialog open={openPopup} maxWidth='md' classes={{ paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                    text="X"
                    color="secondary"
                    onClick={() => {setOpenPopup(false)}}>
                         <CloseIcon fontSize="small"/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
