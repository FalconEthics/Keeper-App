import {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebaseConfig.js";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    //to store the notes when the user is not logged in
    const [notes, setNotes] = useState([]);
    //to store the notes when the user is logged in
    const [dbNotes, setDbNotes] = useState([]);
    //to toggle the auth modal
    const [authModal, setAuthModal] = useState(false);
    //to check if the user is logged in or not
    const [user, setUser] = useState(false);
    //to store the user id
    const [userId, setUserId] = useState("");
    //to store the search query
    const [search, setSearch] = useState("");
    //to toggle the search option
    const [searchOption, setSearchOption] = useState(false);

    useEffect(() => {
        //to check if the user is logged in or not
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                setUser(true);
                setUserId(data.email)
                console.log("login triggered")
            } else {
                setUser(false);
                console.log("logged out");
            }
        });
        return () => unsubscribe();
    }, []);

    const value = {
        notes,
        setNotes,
        authModal,
        setAuthModal,
        user,
        userId,
        setUser,
        dbNotes,
        setDbNotes,
        search,
        setSearch,
        searchOption,
        setSearchOption
        //making all the variables and functions available to all the components
    };

    return (
        //used context api to as a global state management instead of redux
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;