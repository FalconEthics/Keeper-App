import {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebaseConfig.js";
import {collection, getDocs} from "firebase/firestore"

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [authModal, setAuthModal] = useState(false);
    const [user, setUser] = useState(false);
    const [dbNotes, setDbNotes] = useState([]);
    const notesCollectionRef = collection(db, "Notes");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                setUser(true);
            } else {
                setUser(false);
                console.log("logged out");
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getNotesList = async () => {
            try {
                const dbData = await getDocs(notesCollectionRef);
                setDbNotes(dbData.docs.map(doc => ({...doc.data(), id: doc.id})));
            } catch (err) {
                console.error(err)
            }
        };
        getNotesList();
    }, [dbNotes]);

    const value = {
        notes,
        setNotes,
        authModal,
        setAuthModal,
        user,
        setUser,
        dbNotes,
        setDbNotes,
        notesCollectionRef
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;
