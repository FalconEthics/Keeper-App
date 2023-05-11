import {createContext, useState} from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [authModal, setAuthModal] = useState(false);

    const value = {
        notes,
        setNotes,
        authModal,
        setAuthModal
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;
