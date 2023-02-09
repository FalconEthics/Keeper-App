import { TbNotes} from 'react-icons/tb';
function Header() {
    return (
        <header className="p-3 bg-amber-300 text-2xl text-white font-extrabold shadow-2xl">
            <TbNotes className="inline-block"/><span className="inline-block">Keeper</span>
        </header>
    )
}

export default Header