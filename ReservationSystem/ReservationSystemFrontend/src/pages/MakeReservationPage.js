import React from 'react';
import ReservationForm from '../components/ReservationForm';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageHeader from '../components/PageHeader'

const MakeReservation = () => {
    return (
      <div>
           <PageHeader
            title="New reservation"
            subtitle="Make a game and table reservation"
            icon={<AddCircleOutlineOutlinedIcon fontSize="large"/>}
            />
            <ReservationForm></ReservationForm>
      </div>
    );
  };
  
  export default MakeReservation;