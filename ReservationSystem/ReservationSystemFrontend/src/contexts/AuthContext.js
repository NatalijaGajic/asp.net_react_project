import React, {useContext, useEffect, useState} from 'react'
import {loginUserWithEmail, getUserFromToken} from '../api/index';
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth () {
    return useContext(AuthContext)
}   

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loginError, setLoginError] = useState('')
    const history = useHistory();

    //TODO: use effect fetchuje iznova usera
    useEffect(() => {
        getUserFromToken()
        .fetch()
        .then((res) => {
            console.log(res.data);
            setCurrentUser(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    
    function login(email, password){
        loginUserWithEmail(email, password)
        .post()
        .then((response) => {
            console.log(response.data);
            //TODO: add jwt token validation
            if(response.data.token !== null){
                //redirect to home page
                localStorage.setItem('token', response.data.token);
                setLoginError('');
                //TODO: cant go back to login
                history.push('/');
                getUserFromToken()
                .fetch()
                .then((res) => {
                    console.log(res.data);
                    setCurrentUser(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(err);
            setLoginError('Username or password are wrong');
        })
    }
    
    const value = {
        currentUser, 
        login,
        loginError
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
