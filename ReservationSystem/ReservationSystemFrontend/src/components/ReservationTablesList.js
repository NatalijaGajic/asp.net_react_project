import React, {useState, useEffect} from 'react'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { ListItemText, List, ListItem, Paper, IconButton, InputBase, makeStyles, ListItemSecondaryAction} from '@material-ui/core';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex:1
    },
    listRoot:{
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        "& li:hover":{
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root':{
            display: 'block',
            color: '#000'
        },
        '& MuiButtonBase-root':{
            display:'none'
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor: 'transparent'
        }
    }
}))

export default function ReservationTablesList(props) {
    const {tablesArray, setTablesArray, chooseTable} = props;
    const classes = useStyles();
    return (
        <div>
        <Paper className={classes.searchPaper}>
                <InputBase
                placeholder="Pick a table"
                className={classes.searchInput}
                disabled={true}/>
                <IconButton disabled={true}>
                    <PeopleAltTwoToneIcon/>
                </IconButton>
            </Paper>
        <List className={classes.listRoot}>
        {
            tablesArray.map((item, idx) => (
                <ListItem
                key={idx}>
                    <ListItemText
                    primary={item.name}
                    secondary={'Code: ' + item.code + ' Number of seats: ' + item.numberOfPeople}
                    />
                        <ListItemSecondaryAction>
                            <IconButton onClick={e => chooseTable(item)}>
                                <AddCircleOutlineTwoToneIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                </ListItem>
            ))
        }
    </List>
    </div>
    )
}
