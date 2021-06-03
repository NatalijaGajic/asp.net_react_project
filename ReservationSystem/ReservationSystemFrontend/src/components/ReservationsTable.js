import React, {useEffect, useState} from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell, Toolbar, InputAdornment, makeStyles} from '@material-ui/core';
import PaperForm from './PaperForm';
import Controls from '../components/controls/Controls'
import {Close, Search} from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from "react-router-dom";
import Popup from '../components/Popup'
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ReservationFormDisabled from '../components/ReservationFormDisabled';
import Notification from '../components/Notification'
import {cancelReservationWithId, createAPIEndpoint, ENDPOINTS, getUserFromToken} from '../api/index'; 
import ConfirmDialog from '../components/ConfirmDialog'
import {getStringDate} from '../utils/utils'
import InformationDialog from './InformationDialog';
import {useAuth} from '../contexts/AuthContext';

//const userId = "6072e15c7636626e81ac21fb"; //3 penalties
const userId = "6072e13b7636626e81ac21fa";

//TODO: add Date instead od workDayId for display purposes
const headCellsUser = [
    //for sorting purposes id has the same value as object fields (response mapping in ReservationPage)
    {id:'firstAndLastName', label:'Name'},
    {id:'workDayId',label:'Date',disableSorting:true},
    {id:'hours', label:'Time', disableSorting:true},
    {id:'gameName', label:'Game'},
    {id:'tableCode', label:'Table'},
    {id:'people', label:'People'},
    {id:'isCancelled', label:'Cancelled'},
    {id:'details', label:'Details', disableSorting:true},
    {id:'cancel', label:'Cancel', disableSorting:true}
]

const headCellsAdmin = [
    //for sorting purposes id has the same value as object fields (response mapping in ReservationPage)
    {id:'firstAndLastName', label:'Name'},
    {id:'workDayId',label:'Date',disableSorting:true},
    {id:'hours', label:'Time', disableSorting:true},
    {id:'gameName', label:'Game'},
    {id:'tableCode', label:'Table'},
    {id:'people', label:'People'},
    {id:'isCancelled', label:'Cancelled'},
    {id:'details', label:'Details', disableSorting:true},
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


const reservationForCancelInitial = {
    firstAndLastNameDisabled:'',
    workDayId:'',
    startHour:'',
    endHour:'',
    game:'',
    table:''
}

export default function ReservationsTable(props) {

    const {currentUser} = useAuth();
    const records = props.records;
    const displayDelete = props.displayDelete;
    const classes = useStyles();
    const history = useHistory();
    const [headCells, setHeadCells] = useState(headCellsUser);
    const [reservationsArray, setReservationsArray] = useState(records);
    const [user, setUser] = useState({})
    const [filterFn, setfilterFn] = useState({fn: items => {return items;}});
    const [openPopup, setOpenPopup] = useState(false);
    const [reservationForCancel, setReservationForCancel] = useState(reservationForCancelInitial);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    const [ informationDialog, setInformationDialog] = useState({isOpen:false, title:'', subtitle:''})

    useEffect(() => {
        if(currentUser != undefined){
            setUser(currentUser);
        }

    }, [currentUser]);

    useEffect(() => {
        if(displayDelete){
            setHeadCells(headCellsAdmin);
        }else{
            setHeadCells(headCellsUser);
        }
        setReservationsArray(records);
    }, [records, displayDelete]);

    const {
        TblContainer,
        TblHead, 
        TblPagination,
        recordsAfterPaging,
        recordsAfterPagingAndSorting, 
        TblHeadSort
        } =useTable(reservationsArray, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setfilterFn({
            fn: items => {
                if(target.value == '')
                    return items;
                    else
                    return items.filter(x => x.firstAndLastName.toLowerCase().includes(target.value.toLowerCase())
                || x.gameName.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const navigateTo = () => {
        getUserFromToken()
        .fetch()
        .then((res) => {
            console.log(res.data);
            setUser(res.data);
            if(res.data.penalty === 3){
                setInformationDialog({
                    isOpen:true,
                    title:'You have 3 penalties, you can not make reservation',
                    subtitle:'Penalties are deleted after one month.'
                });
            }
            else{
                history.push('/make-reservation');
            }
        })
        .catch(err => {
            console.log(err);
        })
        
    };

    const openInPopup = item => {
        console.log(item);
        setReservationForCancel(item);
        setOpenPopup(true);
    }

    const checkCancelDate = reservationDate => {
        const timeNow = new Date();
        console.log(timeNow);
        console.log(reservationDate);
        const milliseconds = reservationDate - timeNow;
        const hours = milliseconds / 36e5;
        console.log(hours);
        return hours;

    };

    const sendCancelRequest  = item => {
        console.log('sendCancelRequest');
        cancelReservationWithId(item.id).cancel()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        setNotify({isOpen:true, 'message':'Succesfully cancelled', type:'success'});
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        });
        let array = [...reservationsArray]
        const index = array.findIndex(res => res.id === item.id);
        array[index] = {
            ...array[index],
            isCancelled:true
        }
        setReservationsArray(
            array
        );

    }

    const sendDeleteRequest = (item) => {
        //TODO: deleting restrictions based on date
        createAPIEndpoint(ENDPOINTS.RESERVATIONS).delete(item.id)
        .then(res => {
            let array = [...reservationsArray]
            const index = array.findIndex(res => res.id === item.id);
            array.splice(index, 1);
            setConfirmDialog({
                ...confirmDialog,
                isOpen:false
            });
            setReservationsArray(array);
            setNotify({isOpen:true, 'message':'Succesfully deleted', type:'success'});
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteReservation = item => {
        setConfirmDialog({
            isOpen:true,
            title:'Are you sure you want delete this reservation?',
            subtitle:'You can not undo deletion later.',
            onConfirmDialog: () => {sendDeleteRequest(item)}
        })
    }

   const cancelReservation = item => {
       console.log(item);
       if(user.role.name === "Client"){
        let penalty = user.penalty;
        let dateOfLastPenalty = user.dateOfLastPenalty;
        //TODO: check if dateOfLastPenalty is > month, penalties should be deleted 
        let dateOfReservation = item.workDay.date;
        let hours = checkCancelDate(new Date(dateOfReservation)) + item.startHour;
        console.log(hours);
        //hours = 23;
        if(hours < 24){
            setConfirmDialog({
                isOpen:true,
                title:'Are you sure you want to cancel this reservation? This action will get you a penalty.',
                subtitle:'You can not undo cancellation later.'+ 
                'With 3 penalties you can not make new reservations.',
                onConfirmDialog: () => {sendCancelRequest(item)}
            })
        }else{
            setConfirmDialog({
                isOpen:true,
                title:'Are you sure you want to cancel this reservation?',
                subtitle:'You can not undo cancellation later.',
                onConfirmDialog: () => {sendCancelRequest(item)}
            })
        }
       }else {
            setConfirmDialog({
                isOpen:true,
                title:'Are you sure you want to cancel this reservation?',
                subtitle:'You can not undo cancellation later.',
                onConfirmDialog: () => {sendCancelRequest(item)}
            })
       }
      
    }
  
    return (
        <div>
           
            <Toolbar>
                <Controls.Input
                label="Search reservation"
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
                                <TableCell>{item.firstAndLastName}</TableCell>
                                <TableCell> {item.workDay != null?getStringDate(item.workDay.date):''} </TableCell>
                                <TableCell>{item.startHour+'-'+item.endHour}</TableCell>
                                <TableCell>{item.gameName}</TableCell>
                                <TableCell>{item.tableCode}</TableCell>
                                <TableCell>{item.people}</TableCell>
                                <TableCell>{item.isCancelled?'true':'false'}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    color="primary">
                                        <EditOutlinedIcon fontSize="small"
                                        onClick={() => {{openInPopup(item)}}}/>
                                    </Controls.ActionButton>
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    disabled={displayDelete?false:item.isCancelled}
                                    color="secondary">
                                        <CloseIcon fontSize="small"
                                        onClick={() => {{displayDelete?deleteReservation(item):cancelReservation(item)}}}/>
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
            title='Reservation details'>
                <ReservationFormDisabled
                values={reservationForCancel}
                showSubmit={false}/>
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
