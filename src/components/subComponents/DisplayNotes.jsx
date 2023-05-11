import {BiEditAlt, BsFillTrashFill} from "react-icons/all.js";

export function DisplayNotes(props) {
    return (
        <>
            <div className={"flex flex-col bg-white drop-shadow-2xl rounded-2xl"}>
                <div
                    className={"flex flex-row justify-between p-2 pl-4 text-sm bg-amber-200 rounded-2xl rounded-b-none"}>
                    <span>{props.time}</span>
                    <span className={"flex flex-row p-1 space-x-2 text-white"}><BiEditAlt
                        className={"hover:text-black hover:scale-150"}/><BsFillTrashFill
                        className={"hover:text-black hover:scale-150"}/></span>
                </div>
                <h3 className={"break-words text-sm p-4 font-bold border-0 border-b-2 "}>
                    {props.title}
                </h3>
                <p className={"break-words text-md p-4"}>
                    {props.note}
                </p>
            </div>
        </>
    )
}