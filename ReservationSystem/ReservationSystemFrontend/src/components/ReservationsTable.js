import React from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell} from '@material-ui/core';
import PageHeader from '../components/PageHeader'
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import PaperForm from './PaperForm';


const headCells = [
    {id:'firstAndLastName', label:'Name'},
    {id:'hours', label:'Time'},
    {id:'game', label:'Game'},
    {id:'table', label:'Table'},
    {id:'numberOfPeople', label:'People'},
    {id:'isCancelled', label:'Cancelled'}

]

export default function ReservationsTable(props) {

    const {records} = props;

    const {
        TblContainer,
        TblHead
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
                <TblHead/>
                <TableBody>
                    {
                        records.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.firstAndLastName}</TableCell>
                                <TableCell>{item.startHour+'-'+item.endHour}</TableCell>
                                <TableCell>{item.game.name}</TableCell>
                                <TableCell>{item.table.code}</TableCell>
                                <TableCell>{item.table.numberOfPeople}</TableCell>
                                <TableCell>{item.isCancelled?'true':'false'}</TableCell>
                                
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
            </PaperForm>
        </div>
    )
}
