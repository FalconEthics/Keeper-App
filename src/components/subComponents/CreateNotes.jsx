import {AiOutlinePlus} from "react-icons/all.js";
import {useContext, useReducer, useState} from "react";
import {UserContext} from "../../store/UserContext.jsx";

const reducer = (state, action) => {
    let value = "";
    let currentdate = new Date();
    let timeStamp = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} ~ ${currentdate.getHours()}:${currentdate.getMinutes()}`;

    switch (action.type) {
        case "saveTitleChanges":
            value = event.target.value
            return {
                ...state, title: value, time: timeStamp
            }
        case "saveNoteChanges":
            value = event.target.value
            return {
                ...state, note: value, time: timeStamp
            }
        case "clean":
            return {
                title: "", note: "", time: ""
            }
        default:
            return state;
    }
}

export function CreateNotes() {
    const {setNotes} = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, {title: "", note: "", time: ""});
    const [expanded, setExpanded] = useState(false);

    function uploadNote() {
        setNotes((prevNotes) => {
            return [...prevNotes, state]
        });
        dispatch({type: "clean"});
    }

    return (<>
        <form className={"relative flex justify-center"} onSubmit={() => {
            event.preventDefault();
        }}>
            <div
                className={"flex flex-col w-full sm:w-2/3 lg:w-2/5 drop-shadow-2xl bg-white p-4 rounded-2xl"}>
                <input name={"title"} value={state.title} type="text" placeholder={"Title"} maxLength={"50"}
                       className={"p-1 rounded-lg"}
                       onClick={() => {
                           setExpanded(true);
                       }}
                       onChange={() => {
                           dispatch({type: "saveTitleChanges"});
                       }}/>
                <textarea name={"note"} value={state.note} placeholder={"Write your Note here!"} spellCheck={"true"}
                          className={`rounded-lg transition-all duration-300 ${expanded ? "h-24 opacity-100 mt-2 p-1" : "h-0 opacity-0 p-0 m-0"}`}
                          onChange={() => {
                              dispatch({type: "saveNoteChanges"});
                          }}>
                </textarea>
                <button
                    className={"rounded-full bg-amber-300 w-fit p-2 hover:bg-amber-200 text-2xl absolute bottom-[-13%] right-8 text-white hover:text-black hover:scale-150"}
                    onClick={() => {
                        uploadNote();
                    }}>
                    <AiOutlinePlus/></button>
            </div>
        </form>
    </>)
}