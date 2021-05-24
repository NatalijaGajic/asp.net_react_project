import { DialogActions, DialogContent, DialogTitle, Dialog, Typography, makeStyles } from '@material-ui/core'
import React, {useEffect} from 'react'
import Controls from '../components/controls/Controls'

const useStyles = makeStyles(theme => ({
    dialog:{
        position:'absolute',
        padding:theme.spacing(2),
        top:theme.spacing(5)
    },
    dialogContent:{
        textAlign:'center'
    },
    dialogAction:{
        justifyContent:'center'

    }
}))

export default function ConfirmDialog(props) {
    
    const { confirmDialog, setConfirmDialog} = props;
    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
            <DialogTitle>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant='h6'>
                    {confirmDialog.title}
                </Typography>
                <Typography variant='subtitle2'>
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
            <Controls.Button
                text="No"
                color="default"
                onClick={() => setConfirmDialog({
                    ...confirmDialog,
                    isOpen:false
                })}/>
                <Controls.Button
                text="Yes"
                color="secondary"
                onClick={confirmDialog.onConfirmDialog}/>
            </DialogActions>
        </Dialog>
    )
}
