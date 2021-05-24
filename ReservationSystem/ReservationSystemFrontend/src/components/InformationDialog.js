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

export default function InformationDialog(props) {
    
    const { informationDialog, setInformationDialog} = props;
    const classes = useStyles();

    return (
        <Dialog open={informationDialog.isOpen} classes={{paper:classes.dialog}}>
            <DialogTitle>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant='h6'>
                    {informationDialog.title}
                </Typography>
                <Typography variant='subtitle2'>
                    {informationDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
            <Controls.Button
                text="Ok"
                color="secondary"
                onClick={() => setInformationDialog({
                    ...informationDialog,
                    isOpen:false
                })}/>
            </DialogActions>
        </Dialog>
    )
}
