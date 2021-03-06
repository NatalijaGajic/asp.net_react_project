import React, {useState, useEffect} from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell, Toolbar, InputAdornment, makeStyles} from '@material-ui/core';
import Controls from '../components/controls/Controls'
import {Close, Search} from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import GameDetailsForm from '../components/GameDetailsForm';
import Notification from '../components/Notification'
import ConfirmDialog from '../components/ConfirmDialog'
import InformationDialog from './InformationDialog';
import CloseIcon from '@material-ui/icons/Close';
import Popup from '../components/Popup'
import { useHistory } from "react-router-dom";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { createAPIEndpoint, ENDPOINTS } from '../api';


const headCells = [
    //for sorting purposes id has the same value as object fields 
    {id:'name', label:'Name'},
    {id:'valute', label:'Valute', disableSorting:true},
    {id:'price', label:'Price'},
    {id:'numberOfPlayers', label:'Number of players'},
    {id:'isActive', label:'Active'},
    {id:'update', label:'Update', disableSorting:true},
    {id:'delete', label:'Delete', disableSorting:true}
]

const useStyles = makeStyles(theme => ({
    searchInput: {
        position:'absolute',
        width: '75%'
    },
    newButton: {
        position:'absolute',
        //Float button on right side:
        right:'10px',
        bottom:'10px'
    }
}))


export default function GamesTable(props) {
    const records = props.records;
    const classes = useStyles();
    const history = useHistory();
    const [filterFn, setfilterFn] = useState({fn: items => {return items;}});
    const [gamesArray, setGamesArray] = useState(records);
    const [openPopup, setOpenPopup] = useState(false);

    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    const [ informationDialog, setInformationDialog] = useState({isOpen:false, title:'', subtitle:''})
    const [gameIdForDisplay, setGameIdForDisplay] = useState('');

    const {
        TblContainer,
        TblHead, 
        TblPagination,
        recordsAfterPaging,
        recordsAfterPagingAndSorting, 
        TblHeadSort
        } =useTable(gamesArray, headCells, filterFn);

    useEffect(() => {
        setGamesArray(records);
    }, [records]);

    const openInPopup = item => {
        console.log(item);
        setGameIdForDisplay(item.id);
        setOpenPopup(true);
    }

    const deleteGame = (item) => {
        createAPIEndpoint(ENDPOINTS.GAMES).delete(item.id)
        .then(res => {
            let array = [...gamesArray]
            const index = array.findIndex(res => res.id === item.id);
            array.splice(index, 1);
            setConfirmDialog({
                ...confirmDialog,
                isOpen:false
            });
            setGamesArray(array);
            setNotify({isOpen:true, 'message':'Succesfully deleted', type:'success'});
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDelete = (e, item) => {
        e.stopPropagation();
        console.log(item);
        setConfirmDialog({
            isOpen:true,
            title:'Are you sure you want delete this game?',
            subtitle:'You can not undo deletion later.',
            onConfirmDialog: () => {deleteGame(item)}
        })
    }

    const handleUpdate = (e, item) => {
        e.stopPropagation();
        history.push('/update-game/'+item.id);
    }

    const handleSearch = e => {
        let target = e.target;
        setfilterFn({
            fn: items => {
                if(target.value == '')
                    return items;
                    else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }


    const onRowClickHandler = (rowData) => {
        history.push('/games/'+rowData.id);
    }

    const navigateTo = () => {
       history.push('/make-game');
    };

    return (
        <>
        <div> 
            <Toolbar>
                <Controls.Input
                label="Search games"
                className={classes.searchInput}
                onChange={handleSearch}
                inputProps={{
                    startadornment:(<InputAdornment position="start">
                        <Search/>
                    </InputAdornment>)
                }}>
                </Controls.Input>
                <Controls.Button
                className={classes.newButton}
                text="Make new"
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={navigateTo}
                />
            </Toolbar>
            <TblContainer>
                <TblHeadSort/>
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item.id}
                            onClick={() => {onRowClickHandler(item)}}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.valute}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell align="center">{item.numberOfPlayers}</TableCell>
                                <TableCell>{item.isActive?'true':'false'}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    color="primary">
                                        <EditOutlinedIcon fontSize="small"
                                        onClick={(e) => {{handleUpdate(e, item)}}}/>
                                    </Controls.ActionButton>
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    color="secondary">
                                        <CloseIcon fontSize="small"
                                        onClick={(e) => {{handleDelete(e, item)}}}/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
            <TblPagination/>
            <Popup 
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title='Game details'>
                <GameDetailsForm
                gameId={gameIdForDisplay}/>
            </Popup>
            <Notification
            notify={notify}
            setNotify={setNotify}
            ></Notification>
            <ConfirmDialog
            setConfirmDialog={setConfirmDialog}
            confirmDialog={confirmDialog}>
            </ConfirmDialog>
            <InformationDialog
            informationDialog={informationDialog}
            setInformationDialog={setInformationDialog}>
            </InformationDialog>
        </div>
        </>
    )
}
