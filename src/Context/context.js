import React, { createContext, useContext, useState, useEffect, Children } from 'react';

const ConsumerContext = createContext(null);

export const useStateContext = () => {
    const store = useContext(ConsumerContext);
    if(store === null){
        throw new Error("SOmething is wrong Check, data is null");
    }
    return store
}

const StateContext = ({children}) => {
    const [hasAccount, setHasAccount] = useState(false);

    const value = {
        hasAccount, 
        setHasAccount,
    }

    return <ConsumerContext.Provider value={value}> {children} </ConsumerContext.Provider>
}

export default StateContext;