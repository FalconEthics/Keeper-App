import {BiEditAlt, BsFillTrashFill} from "react-icons/all.js";
import {UserContext} from "../../store/UserContext.jsx";
import {useContext, useState} from "react";

export function DisplayNotes(props) {
    const {notes, setNotes} = useContext(UserContext);
    const [editable, setEditable] = useState(false);

    function deleteNote(id) {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    function makeNoteEditable() {
        setEditable(!editable);
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
                {editable ?
                    (<div className={"flex flex-col drop-shadow-2xl rounded-2xl"}>
                        <textarea className={"break-words text-sm p-4 font-bold border-0 border-b-2 bg-gray-100 focus:outline-none"}
                                  defaultValue={props.note}
                                  onChange={(e) => {
                                      const newNotes = notes.map((note) => {
                                          if (note.id === props.id) {
                                              note.note = e.target.value;
                                          }
                                          return note;
                                      });
                                      setNotes(newNotes);
                                  }}
                        />
                        <button className={"p-2 text-sm bg-amber-200 rounded-2xl rounded-t-none hover:bg-amber-300"}
                        onClick={() => makeNoteEditable()}>
                            Save Changes
                        </button>
                    </div>)
                    : <p className={"break-words text-md p-4"}>
                        {props.note}
                    </p>}
            </div>
        </>
    )
}