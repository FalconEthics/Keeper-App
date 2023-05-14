import {CreateNotes} from "./subComponents/CreateNotes.jsx";
import {DisplayNotes} from "./subComponents/DisplayNotes.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../store/UserContext.jsx";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AuthModal} from "./subComponents/AuthModal.jsx";

export function Body() {
    const {notes, authModal, user, dbNotes, search} = useContext(UserContext);
    const [parent] = useAutoAnimate(/* optional config */);
    const [searchFilter, setSearchFilter] = useState([]);

    useEffect(() => {
        if (search != null && search != "" && search != undefined) {
            let newNote = dbNotes.filter((data) => {
                return data.title.includes(search)
            })
            setSearchFilter(newNote)
        } else {
            let newNote = dbNotes
            setSearchFilter(newNote)
        }
        console.log(searchFilter)
    }, [search]);


    return (<div>
        <div className={"w-full flex-col justify-center p-6 space-y-8 mb-10"}>
            <CreateNotes/>
            <div className={"w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4"}
                 ref={parent}>
                {user ? (searchFilter.map((note, index) => {
                    return <DisplayNotes key={index} id={note.id} time={note.time} title={note.title}
                                         note={note.note}/>
                })) : (notes.map((note, index) => {
                    return <DisplayNotes key={index} id={note.id} time={note.time} title={note.title}
                                         note={note.note}/>
                }))}
            </div>
        </div>
        {authModal && <AuthModal/>}
    </div>)
}