import React from 'react'
import {Paper, Typography, Card, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: '#e6eeff',
        borderRadius: 5
    },
    pageHeader:{
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(2),
    },
    pageIcon:{
        display: 'inline-black',
        padding: theme.spacing(2),
        color: '#3c44b1'  
    },
    pageTitle:{
        paddingLeft: theme.spacing(4),
        '& .Muilypography-subtitle2':{
            opacity:'0.6'
        }
    }
}));

export default function PageHeader(props) {
    const {title, subtitle, icon} = props;
    const classes = useStyles();
    return (
        <Paper elevation={0} square className={classes.root}>
           <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography 
                    variant="h6"
                    component="div">
                    {title}</Typography>
                    <Typography 
                    variant="subtitle1"
                    component="div">
                    {subtitle}</Typography>
                </div>
           </div>
            
        </Paper>
    );
}
