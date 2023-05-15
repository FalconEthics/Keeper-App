import {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebaseConfig.js";
import {collection, getDocs, onSnapshot, where, query, orderBy} from "firebase/firestore"

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [authModal, setAuthModal] = useState(false);
    const [user, setUser] = useState(false);
    const [dbNotes, setDbNotes] = useState([]);
    const [userId, setUserId] = useState("");
    const [search, setSearch] = useState("");
    const [searchOption, setSearchOption] = useState(false);

    const notesCollectionRef = collection(db, "Notes");
    const dbQuery = query(notesCollectionRef, where("uploaderEmail", "==", userId))

    useEffect(() => {
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
        const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
            const updatedData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDbNotes(updatedData.filter((data) => data.uploaderEmail === userId));

        });
        console.log("snapshot triggered")
        return () => unsubscribe();
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
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;
