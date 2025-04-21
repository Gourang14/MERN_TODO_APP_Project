// import { createContext } from "react";
// const TokenContext = createContext(null)
// export default TokenContext;


import React, { createContext, useReducer } from "react";
import tokenReducer from '../reducer/tokenReducer';
import userReducer from "../reducer/userReducer";    // adjust path if needed

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [userToken, tokenDispatch] = useReducer(tokenReducer, null);
    const [user, userDispatch] = useReducer(userReducer, {});

    return (
        <TokenContext.Provider value={{ userToken, tokenDispatch, user, userDispatch }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;

