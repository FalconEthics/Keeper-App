import {CreateNotes} from "./subComponents/CreateNotes.jsx";
import {DisplayNotes} from "./subComponents/DisplayNotes.jsx";
import {useContext} from "react";
import {UserContext} from "../store/UserContext.jsx";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {AuthModal} from "./subComponents/AuthModal.jsx";

export function Body() {
    const {notes, authModal} = useContext(UserContext)
    const [parent] = useAutoAnimate(/* optional config */)

    return (<>
        <div className={"w-full flex-col justify-center p-6 space-y-8 mb-10"}>
            <CreateNotes/>
            <div className={"w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4"} ref={parent}>
                {notes.map((note, index) => {
                    return <DisplayNotes key={index} id={note.id} time={note.time} title={note.title} note={note.note}/>
                })}
            </div>
        </div>
        {authModal && <AuthModal/>}
    </>)
}