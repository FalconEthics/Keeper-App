import {CreateNotes} from "./subComponents/CreateNotes.jsx";
import {DisplayNotes} from "./subComponents/DisplayNotes.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../store/UserContext.jsx";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AuthModal} from "./subComponents/AuthModal.jsx";

export function Body() {
    //importing context
    const {notes, authModal, user, dbNotes, search, searchOption} = useContext(UserContext);
    //to use auto animate
    const [parent] = useAutoAnimate(/* optional config */);
    //filtering notes based on search
    const [searchFilter, setSearchFilter] = useState([]);

    useEffect(() => {
        console.log("search filter triggered")
        if (search != null && search != "" && search != undefined) {
            //filtering notes based on search input ~ case insensitive
            setSearchFilter(dbNotes.filter((data) => {
                return data.title.toLowerCase().includes(search.toLowerCase())
            }));
        } else {
            //if search is empty then set notes to dbNotes
            setSearchFilter(dbNotes);
        }
    }, [search]);


    return (<div>
        <div className={`w-full flex-col justify-center p-6 ${searchOption ? 'space-y-8' : 'space-y-12'} mb-10`}>
            <CreateNotes/>
            <div className={"w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4"}
                 ref={parent}>
                {/*if user is logged in then show notes from db else show notes from local storage*/}
                {user ? (searchFilter.map((note, index) => {
                    //these are filtered notes
                    return <DisplayNotes key={index} id={note.id} time={note.time} title={note.title}
                                         note={note.note}/>
                })) : (notes.map((note, index) => {
                    //these are local notes (not local storage, it's just local stateful variable)
                    return <DisplayNotes key={index} id={note.id} time={note.time} title={note.title}
                                         note={note.note}/>
                }))}
            </div>
        </div>
        {/*if authModal is true then show authModal*/}
        {authModal && <AuthModal/>}
    </div>)
}