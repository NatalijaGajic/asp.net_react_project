import React, {useContext, useState} from 'react'
import {loginUserWithEmail} from '../api/index';

const AuthContext = React.createContext();

export function useAuth () {
    return useContext(AuthContext)
}   

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loginError, setLoginError] = useState('')
    
    function login(email, password){
        loginUserWithEmail(email, password)
        .post()
        .then((response) => {
            console.log(response.data);
            //TODO: add jwt token validation
            if(response.data.token !== null){
                //redirect to home page
                setLoginError('');

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
