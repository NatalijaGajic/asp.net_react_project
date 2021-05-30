import React, {useState, useEffect} from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell, Toolbar, InputAdornment, makeStyles, TableFooter} from '@material-ui/core';
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


const headCells = [
    //for sorting purposes id has the same value as object fields 
    {id:'code', label:'Code'},
    {id:'numberOfPeople', label:'Number of people'},
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
    const [tablesArray, setTablesArray] = useState(records);
    const [openPopup, setOpenPopup] = useState(false);

    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    const [ informationDialog, setInformationDialog] = useState({isOpen:false, title:'', subtitle:''})
    const [tableForDisplay, setTableForDisplay] = useState('');

    const {
        TblContainer,
        TblHead, 
        TblPagination,
        recordsAfterPaging,
        recordsAfterPagingAndSorting, 
        TblHeadSort
        } =useTable(tablesArray, headCells, filterFn);

    useEffect(() => {
        setTablesArray(records);
    }, [records]);

    const openInPopup = item => {
        console.log(item);
        setTableForDisplay(item);
        setOpenPopup(true);
    }

    const changeActive = item => {
        console.log(item);

    }

    const handleSearch = e => {
        let target = e.target;
        setfilterFn({
            fn: items => {
                if(target.value == '')
                    return items;
                    else
                    return items.filter(x => x.code.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const navigateTo = () => {
       
    };

    return (
        <div>
           
            <Toolbar>
                <Controls.Input
                label="Search tables"
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
                            <TableRow key={item.id}>
                                <TableCell>{item.code}</TableCell>
                                <TableCell align="inherit">{item.numberOfPeople}</TableCell>
                                <TableCell>{item.isActive?'true':'false'}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    color="primary">
                                        <EditOutlinedIcon fontSize="small"
                                        onClick={() => {{openInPopup(item)}}}/>
                                    </Controls.ActionButton>
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    disabled={item.isCancelled}
                                    color="secondary">
                                        <CloseIcon fontSize="small"
                                        onClick={() => {{changeActive(item)}}}/>
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
            title='Table details'>
                <p>{tableForDisplay}</p>
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
    )
}
