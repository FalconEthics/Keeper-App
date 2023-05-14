import {AiOutlinePlus} from "react-icons/all.js";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {UserContext} from "../../store/UserContext.jsx";
import autoAnimate from "@formkit/auto-animate";
import {addDoc} from "firebase/firestore"
import {auth} from "../../store/firebaseConfig.js";

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
        case "createId":
            value = state.id + 1
            return {
                ...state, id: value
            }
        case "clean":
            return {
                ...state, title: "", note: ""
            }
        default:
            return state;
    }
}

export function CreateNotes() {
    const {setNotes, user, notesCollectionRef} = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, {id: 0, title: "", note: "", time: "", uploaderEmail: ""});
    const [expanded, setExpanded] = useState(false);
    const parent = useRef(null);

    const uploadNote = async () => {
        if (user){
            try {
                await addDoc(notesCollectionRef, {
                    title: state.title,
                    time: state.time,
                    note: state.note,
                    uploaderEmail: auth?.currentUser?.email
                })
            }
            catch (err) {
                console.error(err);
            }
        }else{
            setNotes((prevNotes) => {
                return [...prevNotes, state]
            });
        }
        dispatch({type: "clean"});
    }

    useEffect(() => {
        parent.current && autoAnimate(parent.current, {duration: 300})
    }, [parent])

    return (<>
        <form className={"relative flex justify-center"} onSubmit={() => {
            event.preventDefault();
        }}>
            <div
                ref={parent}
                className={"flex flex-col w-full sm:w-2/3 lg:w-2/5 drop-shadow-2xl bg-white p-4 rounded-2xl"}>
                <input name={"title"} value={state.title} type="text" placeholder={"Title"} maxLength={"50"}
                       className={"p-1 rounded-lg focus:outline-none outline-amber-200"}
                       onClick={() => {
                           setExpanded(true);
                       }}
                       onChange={() => {
                           dispatch({type: "saveTitleChanges"});
                       }}/>
                {expanded &&
                    <textarea name={"note"} value={state.note} placeholder={"Write your Note here!"} spellCheck={"true"}
                              className={"focus:outline-none outline-amber-200 rounded-lg h-24 opacity-100 mt-2 p-1"}
                              onChange={() => {
                                  dispatch({type: "saveNoteChanges"});
                              }}
                    ></textarea>}
                <button
                    className={"rounded-full bg-amber-300 w-fit p-2 hover:bg-amber-200 text-2xl absolute bottom-[-13%] right-8 text-white hover:text-black hover:scale-150"}
                    onClick={() => {
                        dispatch({type: "createId"});
                        uploadNote();
                    }}>
                    <AiOutlinePlus/></button>
            </div>
        </form>
    </>)
}