import {GrChapterAdd} from "react-icons/gr";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {add} from "../store/noteSlice";

function CreateNotes() {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    let date = new Date();
    const [note, setNote] = useState({
        title: "",
        content: "",
        date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " ~ " + date.getHours() + ":" + date.getMinutes()
    });
    function handleTitleChange(event){
        setNote({title: event.target.value, content: note.content, date: note.date});
    }
    function handleContentChange(event){
        setNote({title: note.title, content: event.target.value, date: note.date});
    }
    function onSubmit(event){
        dispatch(add(note));
        setNote({
            title: "",
            content: "",
            date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " ~ " + date.getHours() + ":" + date.getMinutes()
        });
        event.preventDefault();
    }
    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <div className="flex-col p-5 space-y-10">
                <form className="relative flex justify-center">
                    <div className={"flex w-1/2 flex-col rounded-2xl bg-white p-4 shadow-2xl space-y-2 " + (expanded ? 'h-40' : 'h-1/1')}>
                        <input onClick={expand} onChange={handleTitleChange} value={note.title} className="outline-none" maxLength="50" type="text" placeholder="Title"/>
                        {expanded && (<textarea onChange={handleContentChange} value={note.content} className="outline-none h-full text-gray-600" placeholder="Write your note here"/>)}
                        {expanded && (<button type="submit" onClick={onSubmit}
                                className="absolute top-[80%] right-[27%] p-3 text-white rounded-full bg-amber-300 w-fit hover:bg-amber-100">
                            <GrChapterAdd className="text-white"/></button>)}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateNotes;