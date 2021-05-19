import React from 'react';
import ReservationForm from '../components/ReservationForm';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageHeader from '../components/PageHeader'
import PaperForm from '../components/PaperForm';

const MakeReservation = () => {
    return (
      <div>
           <PageHeader
            title="New reservation"
            subtitle="Make a game and table reservation"
            icon={<AddCircleOutlineOutlinedIcon fontSize="large"/>}
            />
            <PaperForm>
                <ReservationForm></ReservationForm>
            </PaperForm>
      </div>
    );
  };
  
  export default MakeReservation;