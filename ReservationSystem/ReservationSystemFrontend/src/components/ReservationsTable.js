import React, {useState} from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell, Toolbar, InputAdornment, makeStyles} from '@material-ui/core';
import PageHeader from '../components/PageHeader'
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import PaperForm from './PaperForm';
import Controls from '../components/controls/Controls'
import {Search} from '@material-ui/icons'

const headCells = [
    //for sorting purposes id has the same value as object fields (response mapping in ReservationPage)
    {id:'firstAndLastName', label:'Name'},
    {id:'hours', label:'Time', disableSorting:true},
    {id:'game', label:'Game'},
    {id:'table', label:'Table'},
    {id:'numberOfPeople', label:'People'},
    {id:'isCancelled', label:'Cancelled'}

]

const useStyles = makeStyles(theme => ({
    searchInput: {
        width: '75%'
    }
}))

export default function ReservationsTable(props) {

    const records = props.records;
    const classes = useStyles();
    const [filterFn, setfilterFn] = useState({fn: items => {return items;}});

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
  
    return (
        <div>
            <PageHeader
            title="Reservations"
            subtitle="All reservations"
            icon={<AlarmOnTwoToneIcon fontSize="large"/>}
            />
            <PaperForm>
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
            </Toolbar>
            <TblContainer>
                <TblHeadSort/>
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.firstAndLastName}</TableCell>
                                <TableCell>{item.startHour+'-'+item.endHour}</TableCell>
                                <TableCell>{item.game}</TableCell>
                                <TableCell>{item.table}</TableCell>
                                <TableCell>{item.numberOfPeople}</TableCell>
                                <TableCell>{item.isCancelled?'true':'false'}</TableCell>
                                
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
            <TblPagination/>
            </PaperForm>
        </div>
    )
}
