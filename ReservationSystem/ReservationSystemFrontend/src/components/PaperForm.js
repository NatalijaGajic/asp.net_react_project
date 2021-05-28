import React from 'react'
import {makeStyles, Paper} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3)
  
    }
  }));
  


export default function PaperForm(props) {
  const {...other} = props;
  const classes = useStyle();

    return (
    <Paper className={classes.pageContent} {...other}>
        {props.children}
    </Paper>
    )
}
