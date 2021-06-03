import React, {useContext, useEffect, useState} from 'react'
import {loginUserWithEmail, getUserFromToken, createAPIEndpoint, ENDPOINTS} from '../api/index';
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth () {
    return useContext(AuthContext)
}   

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loginError, setLoginError] = useState('')
    const [signupError, setSignupError] = useState('')

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
                        history.push('/home-page/')
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
    
    function signup(body, onSuccess){
        createAPIEndpoint(ENDPOINTS.CLIENTS).create(body)
        .then(res => {
            setLoginError('');
            onSuccess()
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if(error.response.status == 400){
                    setSignupError(error.response.data)
                }
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the 
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
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
        setLoginError,
        logout,
        signup,
        signupError, 
        setSignupError
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
