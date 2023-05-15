import {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebaseConfig.js";
import {collection, getDocs, onSnapshot, where, query, orderBy} from "firebase/firestore"

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
    //to store the firestore notes collection reference
    const notesCollectionRef = collection(db, "Notes");
    //to store the firestore query
    const dbQuery = query(notesCollectionRef, where("uploaderEmail", "==", userId), orderBy('time', 'asc'))

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

    useEffect(() => {
        //to fetch notes only when the user is logged in
        if (user) {
            //to fetch the notes whenever the there is a change in the firestore
            const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
                const updatedData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setDbNotes(updatedData.filter((data) => data.uploaderEmail === userId));

            });
            console.log("snapshot triggered")
            return () => unsubscribe();
        }
        else {
            setDbNotes([]);
        }
    }, [notesCollectionRef, userId]);

    const value = {
        notes,
        setNotes,
        authModal,
        setAuthModal,
        user,
        setUser,
        dbNotes,
        setDbNotes,
        notesCollectionRef,
        search,
        setSearch,
        searchOption,
        setSearchOption
        //making all the variables and functions available to all the components
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;
