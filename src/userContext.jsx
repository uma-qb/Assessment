import {createContext, useState} from 'react'

export const userContext = createContext();

export const userProvider = ({children}) => {
    const [userData, setUserData] = useState(null);

    return (
        <userContext.Provider value={{userData, setUserData}}>
            {children}
        </userContext.Provider>
    );

};



export default userContext
