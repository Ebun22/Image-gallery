import React, { createContext, useContext, useState, useEffect, Children } from 'react';

const StateContext = createContext(null);

export const useStateContext = () => {
    const store = useContext(StateContext);
    if(store === null){
        throw new Error("SOmething is wrong Check, data is null");
    }
    return store
}

const ContextProvider = ({children}) => {
    const [hasAccount, setHasAccount] = useState(false);
   const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');
    const [search, setSearch] = useState('')

    const value = {
        hasAccount, 
        setHasAccount,
        error, 
        setError,
        loading, 
        setLoading,
        search, 
        setSearch,
    }

    return <StateContext.Provider value={value}> {children} </StateContext.Provider>
}

export default ContextProvider;