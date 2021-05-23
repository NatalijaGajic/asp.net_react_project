import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root:{
        minWidth: 0,
        margin:theme.spacing(0.3)
    },
    secondary:{
        backgroundColor: theme.palette.secondary.light,
        '& Muibutton-label':{
            color: theme.palette.secondary.light,
        }
    },
    primary:{
        backgroundColor: theme.palette.primary.light,
        '& Muibutton-label':{
            color: theme.palette.primary.light,
        }
    }
}))

export default function ActionButton(props) {
    const {color, children, onClick, ...other} = props;
    const classes = useStyles();

    return (
        <Button onClick={onClick} className={`#c${classes.root} ${classes[color]}`} {...other}>
            {children}
        </Button>
    )
}
