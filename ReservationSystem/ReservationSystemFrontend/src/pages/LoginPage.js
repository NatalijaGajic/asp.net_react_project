import React from 'react'
import PageHeader from '../components/PageHeader'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PaperForm from '../components/PaperForm';
import LoginForm from '../components/LoginForm'

export default function Login() {
    return (
        <div>
        <PageHeader
        title="Log in"
        subtitle="Insert account information"
        icon={<AccountCircleOutlinedIcon fontSize="large"/>}
        />
        <PaperForm>
          <LoginForm/>
        </PaperForm>
        </div>
    )
}
