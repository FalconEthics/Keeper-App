import {AiFillEdit, AiFillSave} from 'react-icons/ai';
import {BsFillTrashFill} from 'react-icons/bs';
import {useDispatch} from 'react-redux';
import {remove} from '../store/noteSlice';
import {useState} from "react";


function Notes(props) {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [saved, setSaved] = useState(false);
    let date = new Date();
    const [note, setNote] = useState({
        title: "",
        content: "",
        date: "Edited on " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " ~ " + date.getHours() + ":" + date.getMinutes()
    });
    function handleTitleChange(event){
        if (note.content === ""){
        setNote({title: event.target.value, content: props.content, date: note.date});}
        else{
            setNote({title: event.target.value, content: note.content, date: note.date});
        }
    }
    function handleContentChange(event){
        if (note.title === ""){
        setNote({title: props.title, content: event.target.value, date: note.date});}
        else{
            setNote({title: note.title, content: event.target.value, date: note.date});
        }
    }
    function onSubmit(){
        setSaved(true);
        setEditable(false);
    }

    function deleteNote(id) {
        dispatch(remove(id));
    }

    function editNote() {
        setEditable(true);
    }



    return (
        <div>
            <div className="flex flex-col p-3 shadow-2xl rounded-2xl space-y-2 bg-white">
                <div className="bg-amber-300 p-1 rounded-lg text-sm flex flex-row">
                    <span className="font-serif pl-1 text-gray-600">{!saved ? props.date : note.date}</span>
                    <div className=" p-1 ml-auto flex flex-row space-x-2">{!editable ? (<AiFillEdit onClick={editNote}
                                                                                                    className="text-white hover:text-black"/>) : (
                        <AiFillSave onClick={onSubmit}
                            className="text-white hover:text-black"/>)}<BsFillTrashFill
                        onClick={() => deleteNote(props.id)} className="hover:text-black text-white"/></div>
                </div>
                {!editable ? (<span className="text-xl break-words">{!saved ? props.title : note.title}</span>) : (
                    <textarea onChange={handleTitleChange}
                        className="text-xl break-words">{!saved ? props.title : note.title}</textarea>)}
                {!editable ? (<span className="text-sm text-gray-600 break-words">{ !saved ? props.content : note.content}</span>) : (
                    <textarea onChange={handleContentChange}
                        className="text-sm text-gray-600 break-words">{!saved ? props.content : note.content}</textarea>)}
            </div>
        </div>
    )
}

export default Notes