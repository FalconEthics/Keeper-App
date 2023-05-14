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
    const [userId, setUserId] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                setUser(true);
                setUserId(data.email)
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
                const filtereData = dbData.docs.map(doc => ({...doc.data(), id: doc.id}));
                setDbNotes(filtereData.filter((data) => {
                    return data.uploaderEmail == userId
                }));
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
        notesCollectionRef,
        search,
        setSearch
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;
