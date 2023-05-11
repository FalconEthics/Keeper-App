import {CreateNotes} from "./subComponents/CreateNotes.jsx";
import {DisplayNotes} from "./subComponents/DisplayNotes.jsx";
import {useContext} from "react";
import {UserContext} from "../store/UserContext.jsx";

export function Body() {
    const {notes} = useContext(UserContext)

    return (<>
        <div className={"w-full flex-col justify-center p-6 space-y-8 mb-10"}>
            <CreateNotes/>
            <div className={"w-full grid sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4"}>
                {notes.map((note, index) => {
                    return <DisplayNotes key={index} time={note.time} title={note.title} note={note.note}/>
                })}
            </div>
        </div>
    </>)
}