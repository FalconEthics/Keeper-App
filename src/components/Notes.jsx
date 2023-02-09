import {AiFillEdit} from 'react-icons/ai';
import {BsFillTrashFill} from 'react-icons/bs';
import {useDispatch} from 'react-redux';
import {remove} from '../store/noteSlice';
import { useAutoAnimate } from '@formkit/auto-animate/react'

function Notes(props) {
    const dispatch = useDispatch();
    function deleteNote(id){
        dispatch(remove(id));
    }
    return (
        <div>
            <div className="flex flex-col p-3 shadow-2xl rounded-2xl space-y-2 bg-white">
                <div className="bg-amber-300 p-1 rounded-lg text-sm flex flex-row">
                    <span className="font-serif pl-1 text-gray-600">{props.date}</span>
                    <div className=" p-1 ml-auto flex flex-row space-x-2"><AiFillEdit className="text-white"/><BsFillTrashFill onClick={() => deleteNote(props.id)} className="hover:text-black text-white"/></div>
                </div>
                <span className="text-xl break-words">{props.title}</span>
                <span className="text-sm text-gray-600 break-words">L{props.content}</span>
            </div>
        </div>
    )
}

export default Notes