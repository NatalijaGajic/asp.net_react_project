  
import React from 'react';
import PageHeader from '../components/PageHeader'
import RegisterForm from '../components/RegisterForm'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PaperForm from '../components/PaperForm';

const SignUp = () => {
  return (
    <div>
        <PageHeader
        title="Register"
        subtitle="Insert account information"
        icon={<AccountCircleOutlinedIcon fontSize="large"/>}
        />
        <PaperForm>
          <RegisterForm/>
        </PaperForm>
    </div>
  );
};

export default SignUp;