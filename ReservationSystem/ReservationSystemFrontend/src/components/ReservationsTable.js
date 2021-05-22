import React from 'react'
import useTable from './UseTable';
import {TableRow, TableBody, TableCell} from '@material-ui/core';
import PageHeader from '../components/PageHeader'
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';


export default function ReservationsTable(props) {

    const {records} = props;

    const {
        TblContainer
        } =useTable();
  
    return (
        <div>
            <PageHeader
            title="Reservations"
            subtitle="All reservations"
            icon={<AlarmOnTwoToneIcon fontSize="large"/>}
            />
            <TblContainer>
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
        </div>
    )
}
