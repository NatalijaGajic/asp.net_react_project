import { ListItemText, List, ListItem, Paper, IconButton, InputBase, makeStyles, ListItemSecondaryAction} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {intervalsForWorkDay} from '../api/index';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { Autocomplete } from '@material-ui/lab';

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


export default function ReservationGamesList(props) {
    const {queryParams, setQueryParams, chooseGame} = props;
    const [gamesArray, setGamesArray] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        intervalsForWorkDay(queryParams.workDayId, queryParams.startHour, queryParams.endHour)
        .fetch()
        .then(res => {
            console.log(res.data);
            setGamesArray(res.data.games);
            setSearchList(res.data.games);
        })
        .catch(err => {
            console.log(err);
        });
    }, [queryParams]);

    useEffect(() => {
        let x = [...gamesArray];
        x = x.filter(game => {
            return game.name.toLowerCase().includes(searchKey.toLowerCase())
        });
        setSearchList(x);
    }, [searchKey]);

    return (
        <div>
            <Paper className={classes.searchPaper}>
                <InputBase
                placeholder="Search for games"
                className={classes.searchInput}
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}/>
                <IconButton>
                    <SearchTwoToneIcon/>
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {
                    searchList.map((item, idx) => (
                        <ListItem
                        key={idx}>
                            <ListItemText
                            primary={item.name}
                            secondary={item.valute + item.price+' per hour'}
                            />
                                <ListItemSecondaryAction>
                                    <IconButton>
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
