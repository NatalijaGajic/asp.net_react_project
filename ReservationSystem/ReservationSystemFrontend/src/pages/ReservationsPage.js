import React, {useState, useEffect} from 'react'
import ReservationsTable from '../components/ReservationsTable'
import {reservationsForAccount} from '../api/index';
import Loader from '../components/Loader';
import {CircularProgress} from '@material-ui/core'
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import PageHeader from '../components/PageHeader'
import {useAuth} from '../contexts/AuthContext';


//const userId = "6072e15c7636626e81ac21fb"; //3 penalties
const userId = "6072e13b7636626e81ac21fa";


export default function Reservations() {

    const [records, setRecords] = useState();
    const [isLoading, setLoading] = useState(true);
    const {currentUser} = useAuth();

    useEffect(() => {
        if(currentUser != undefined){
            reservationsForAccount(currentUser.id).fetch()
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
        }
       
    }, [currentUser])

    if(isLoading){
        return (
          <CircularProgress />
        );
      }else{
        return (
            <div>
                <PageHeader
                title="Reservations"
                subtitle="All reservations"
                icon={<AlarmOnTwoToneIcon fontSize="large"/>}
                />
                <ReservationsTable records={records} displayDelete={false}></ReservationsTable>
          </div>
        )
    }

}
