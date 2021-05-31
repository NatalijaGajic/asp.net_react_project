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
                localStorage.setItem('token', response.data.token);
                setLoginError('');
                //TODO: cant go back to login
                getUserFromToken()
                .fetch()
                .then((res) => {
                    console.log(res.data);
                    setCurrentUser(res.data);
                    if(res.data.role.name === "Client"){
                        history.push('/');
                    }
                    else if(res.data.role.name === "Worker"){
                        history.push('/home-page')
                    }

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
    
    function logout(){
        localStorage.removeItem('token');
        setCurrentUser(null);
        history.push('/');
    }

    const value = {
        currentUser, 
        login,
        loginError,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
