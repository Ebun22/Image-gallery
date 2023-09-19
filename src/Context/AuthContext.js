import React, { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '@/app/firebase';

const AuthContext = createContext(null);

export const UseAuthContext = () => {
    const store = useContext(AuthContext);
    if (store == null) {
        throw new Error("Authentication context has an error")
    }
    return store;
}

const AuthContextProvider = ({ children }) => {
    const[currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    //function for signup with firebase
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //function for login with firebase
    function login(email, password) {
        setIsLogin(true)
        return auth.signInWithEmailAndPassword(email, password)
    }

    //function that firebase uses to set new user
    useEffect(() => {
        //the param user would either be null or the new user instance
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            //when we have a user
            setLoading(false)
        })

        //helps us unmount from the onAuth
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        isLogin,
        setIsLogin,
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthContextProvider;