import React, {useState} from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell, Toolbar, InputAdornment, makeStyles} from '@material-ui/core';
import PageHeader from '../components/PageHeader'
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import PaperForm from './PaperForm';
import Controls from '../components/controls/Controls'
import {Close, Search} from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from "react-router-dom";
import Popup from '../components/Popup'
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ReservationFormDisabled from '../components/ReservationFormDisabled';

//TODO: add Date instead od workDayId for display purposes
const headCells = [
    //for sorting purposes id has the same value as object fields (response mapping in ReservationPage)
    {id:'firstAndLastName', label:'Name'},
    {id:'workDayId',label:'Date',disableSorting:true},
    {id:'hours', label:'Time', disableSorting:true},
    {id:'game', label:'Game'},
    {id:'table', label:'Table'},
    {id:'numberOfPeople', label:'People'},
    {id:'isCancelled', label:'Cancelled'},
    {id:'details', label:'Details', disableSorting:true},
    {id:'cancel', label:'Cancel', disableSorting:true},
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

/*  <Controls.Button
    className={classes.newButton}
    text="Make new"
    variant="outlined"
    startIcon={<AddIcon/>}
    /> */

const reservationForCancelInitial = {
    firstAndLastNameDisabled:'',
    workDayId:'',
    startHour:'',
    endHour:'',
    game:'',
    table:''
}

export default function ReservationsTable(props) {

    const records = props.records;
    const classes = useStyles();
    const [filterFn, setfilterFn] = useState({fn: items => {return items;}});
    const [openPopup, setOpenPopup] = useState(false);
    const [reservationForCancel, setReservationForCancel] = useState(reservationForCancelInitial);

    const {
        TblContainer,
        TblHead, 
        TblPagination,
        recordsAfterPaging,
        recordsAfterPagingAndSorting, 
        TblHeadSort
        } =useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setfilterFn({
            fn: items => {
                if(target.value == '')
                    return items;
                    else
                    return items.filter(x => x.firstAndLastName.toLowerCase().includes(target.value.toLowerCase())
                || x.game.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const history = useHistory();
    const navigateTo = () => history.push('/make-reservation');

    const openInPopup = item => {
        setReservationForCancel(item);
        setOpenPopup(true);
    }

    const cancelReservation = e => {
        e.preventDefault();
        setOpenPopup(false);
    }
  
    return (
        <div>
            <PageHeader
            title="Reservations"
            subtitle="All reservations"
            icon={<AlarmOnTwoToneIcon fontSize="large"/>}
            />
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
                                <TableCell> 2021-03-15 </TableCell>
                                <TableCell>{item.startHour+'-'+item.endHour}</TableCell>
                                <TableCell>{item.game}</TableCell>
                                <TableCell>{item.table}</TableCell>
                                <TableCell>{item.numberOfPeople}</TableCell>
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
                                    disabled={item.isCancelled}
                                    color="secondary">
                                        <CloseIcon fontSize="small"/>
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
            title='Reservation details'
            >
                <ReservationFormDisabled
                values={reservationForCancel}
                handleSubmit={cancelReservation}
                showSubmit={false}/>
            </Popup>
        </div>
    )
}
