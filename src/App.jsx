import Header from "./components/Header.jsx"
import CreateNotes from "./components/CreateNotes.jsx"
import Footer from "./components/Footer.jsx"
import Notes from "./components/Notes.jsx"
import {useSelector} from "react-redux";
import { useAutoAnimate } from '@formkit/auto-animate/react'


function App() {
    const notes = useSelector(state => state.note);
    const [listRef] = useAutoAnimate({ duration: 200, delay: 0, easing: 'ease-in-out' })
    return (<div
            className="space-y-3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] h-screen font-sans">
            <Header/>
            <CreateNotes/>
            <div className="p-10 pt-6 grid laptop:grid-cols-4 gap-4 tablet:grid-cols-2 mobile:grid-cols-1" ref={listRef}>
                {notes.map((note, index) => {
                    return <Notes key={index} id={index} title={note.title} content={note.content} date={note.date}/>
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default App
