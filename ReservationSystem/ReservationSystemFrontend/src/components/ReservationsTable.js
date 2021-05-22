import React from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell} from '@material-ui/core';
import PageHeader from '../components/PageHeader'
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import PaperForm from './PaperForm';


const headCells = [
    //for sorting purposes id has the same value as object fields (response mapping in ReservationPage)
    {id:'firstAndLastName', label:'Name'},
    {id:'hours', label:'Time', disableSorting:true},
    {id:'game', label:'Game'},
    {id:'table', label:'Table'},
    {id:'numberOfPeople', label:'People'},
    {id:'isCancelled', label:'Cancelled'}

]

export default function ReservationsTable(props) {

    const records = props.records;

    const {
        TblContainer,
        TblHead, 
        TblPagination,
        recordsAfterPaging,
        recordsAfterPagingAndSorting, 
        TblHeadSort
        } =useTable(records, headCells);
  
    return (
        <div>
            <PageHeader
            title="Reservations"
            subtitle="All reservations"
            icon={<AlarmOnTwoToneIcon fontSize="large"/>}
            />
            <PaperForm>
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
