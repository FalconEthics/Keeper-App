import {BiEditAlt, BsFillTrashFill} from "react-icons/all.js";
import {UserContext} from "../../store/UserContext.jsx";
import {useContext, useState} from "react";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../store/firebaseConfig.js";

export function DisplayNotes(props) {
    //importing the notes array from the UserContext
    const {notes, setNotes, user} = useContext(UserContext);
    //state to toggle the edit mode
    const [editable, setEditable] = useState(false);
    //state to store the updated note
    const [updatedNote, setUpdatedNote] = useState("")

    const deleteNote = async (id) => {
        console.log("deleteNote triggered")
        if (user) {
            try {
                //delete the note from the database
                const noteToDelete = doc(db, "Notes", id);
                await deleteDoc(noteToDelete);
            } catch (err) {
                console.error(err);
            }

        } else {
            //delete the note from the local notes array
            const newNotes = notes.filter((note) => note.id !== id);
            setNotes(newNotes);
        }
    }

    function makeNoteEditable() {
        //toggle the edit mode
        console.log("makeNoteEditable triggered")
        setEditable(!editable);
    }

    const updateNote = async (id) => {
        console.log("updateNote triggered")
        setEditable(!editable);
        try {
            //update the note in the database
            const noteToUpdate = doc(db, "Notes", id);
            await updateDoc(noteToUpdate, {note: updatedNote});
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className={"flex flex-col h-fit bg-white drop-shadow-2xl rounded-2xl"}>
                <div
                    className={"flex flex-row justify-between p-2 pl-4 text-sm bg-amber-200 rounded-2xl rounded-b-none"}>
                    <span>{props.time}</span>
                    <span className={"flex flex-row p-1 space-x-2 text-white"}>
                        <BiEditAlt
                            onClick={() => makeNoteEditable()}
                            className={"hover:text-black hover:scale-150"}/>
                        <BsFillTrashFill
                            onClick={() => deleteNote(props.id)}
                            className={"hover:text-black hover:scale-150"}/>
                    </span>
                </div>
                <h3 className={"break-words text-sm p-4 font-bold border-0 border-b-2 "}>
                    {props.title}
                </h3>
                {/*if the user is logged in, the note will be editable*/}
                {editable ?
                    (<div className={"flex flex-col drop-shadow-2xl rounded-2xl"}>
                        <textarea
                            className={"break-words text-sm p-4 font-bold border-0 border-b-2 bg-gray-100 focus:outline-none"}
                            defaultValue={props.note}
                            onChange={(e) => {
                                //if the user is logged in, store the updated note in the state else update the note in the local notes array
                                if (user) {
                                    //store the updated note in the state
                                    setUpdatedNote(e.target.value)
                                } else {
                                    //update the note in the local notes array
                                    const newNotes = notes.map((note) => {
                                        if (note.id === props.id) {
                                            note.note = e.target.value;
                                        }
                                        return note;
                                    });
                                    setNotes(newNotes);
                                }
                            }}
                        />
                        <button className={"p-2 text-sm bg-amber-200 rounded-2xl rounded-t-none hover:bg-amber-300"}
                                onClick={() => {
                                    //if the user is logged in, update the note in the database else update the note in the local notes array
                                    if (user) {
                                        updateNote(props.id)
                                    } else {
                                        makeNoteEditable()
                                    }
                                }}>
                            Save Changes
                        </button>
                    </div>)
                    : <p className={"break-words text-md p-4"}>
                        {props.note}
                    </p>
                }
            </div>
        </>
    )
}