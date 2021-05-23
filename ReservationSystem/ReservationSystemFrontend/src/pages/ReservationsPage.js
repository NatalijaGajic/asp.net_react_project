import React, {useState, useEffect} from 'react'
import ReservationsTable from '../components/ReservationsTable'
import {reservationsForAccount} from '../api/index';
import Loader from '../components/Loader';

const userId = "6072e13b7636626e81ac21fa";


export default function Reservations() {

    const [records, setRecords] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        reservationsForAccount(userId).fetch()
        .then((response) => {
            let res = response.data.map((reservation) => ({
                ...reservation,
                gameName:reservation.game.name,
                tableCode:reservation.table.code,
                people:reservation.table.numberOfPeople
            }
            ))
            setRecords(res);
            setLoading(false);

        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    if(isLoading){
        return (
            <Loader></Loader>
        )
    }else{
        return (
            <div>
    
                <ReservationsTable records={records}></ReservationsTable>
          </div>
        )
    }

}
