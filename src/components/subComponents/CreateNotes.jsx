import {AiOutlinePlus} from "react-icons/all.js";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {UserContext} from "../../store/UserContext.jsx";
import autoAnimate from "@formkit/auto-animate";
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from "../../store/firebaseConfig.js";

const reducer = (state, action) => {
    //reducer function to handle state changes
    console.log("reducer triggered")
    let value = "";
    let currentdate = new Date();
    let timeStamp = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} ~ ${currentdate.getHours()}:${currentdate.getMinutes()}`;

    switch (action.type) {
        case "saveTitleChanges":
            //save title changes to title state
            value = event.target.value
            return {
                ...state, title: value, time: timeStamp
            }
        case "saveNoteChanges":
            //save note changes to note state
            value = event.target.value
            return {
                ...state, note: value, time: timeStamp
            }
        case "createId":
            //create id for note
            value = state.id + 1
            return {
                ...state, id: value
            }
        case "clean":
            //clean state to make input fields empty
            return {
                ...state, title: "", note: ""
            }
        default:
            return state;
    }
}

export function CreateNotes() {
    //component to create notes
    const {setNotes, user, notesCollectionRef} = useContext(UserContext);
    //reducer to handle state changes
    const [state, dispatch] = useReducer(reducer, {id: 0, title: "", note: "", time: "", uploaderEmail: ""});
    //state to handle animation
    const [expanded, setExpanded] = useState(false);
    //ref to handle animation with autoAnimate
    const parent = useRef(null);

    const uploadNote = async () => {
        console.log("uploadNote triggered")
        //upload note to firestore if user is logged in else add note to local state
        if (user){
            try {
                const notesCollectionRef = collection(db, "Notes");
                //upload note to firestore
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
            //add note to local state
            setNotes((prevNotes) => {
                return [...prevNotes, state]
            });
        }
        //clean state to make input fields empty after uploading note
        dispatch({type: "clean"});
    }

    useEffect(() => {
        //trigger animation when component mounts
        console.log("animation triggered")
        parent.current && autoAnimate(parent.current, {duration: 300})
    }, [parent])

    return (<>
        <form className={"relative flex justify-center"} onSubmit={() => {
            //prevent form from page reload on submit
            event.preventDefault();
        }}>
            <div
                ref={parent}
                className={"flex flex-col w-full sm:w-2/3 lg:w-2/5 drop-shadow-xl bg-white p-4 rounded-2xl"}>
                <input name={"title"} value={state.title} type="text" placeholder={"Title"} maxLength={"50"}
                       className={"p-1 rounded-lg focus:outline-none outline-amber-200"}
                       onClick={() => {
                           //expand input field on click
                           setExpanded(true);
                       }}
                       onChange={() => {
                           //save title changes to title state
                           dispatch({type: "saveTitleChanges"});
                       }}/>
                {/*expand input field on click*/}
                {expanded &&
                    <textarea name={"note"} value={state.note} placeholder={"Write your Note here!"} spellCheck={"true"}
                              className={"focus:outline-none outline-amber-200 rounded-lg h-24 opacity-100 mt-2 p-1"}
                              onChange={() => {
                                  //save note changes to note state
                                  dispatch({type: "saveNoteChanges"});
                              }}
                    ></textarea>}
                <button
                    className={"rounded-full bg-amber-300 w-fit p-2 hover:bg-amber-200 text-2xl absolute bottom-[-13%] right-8 text-white hover:text-black hover:scale-150"}
                    onClick={() => {
                        //create id for note
                        dispatch({type: "createId"});
                        //upload note to firestore if user is logged in else add note to local state
                        uploadNote();
                    }}>
                    <AiOutlinePlus/></button>
            </div>
        </form>
    </>)
}