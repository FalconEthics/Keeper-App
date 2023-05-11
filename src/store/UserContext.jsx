import {createContext, useState} from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [notes, setNotes] = useState([]);

    const value = {
        notes,
        setNotes
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;
