import {useContext} from "react";
import {UserContext} from "../store/UserContext.jsx";


export function Nav() {
    const {authModal, setAuthModal} = useContext(UserContext);

    return (
        <>
            <nav className={"flex flex-row h-20 p-4 justify-between bg-amber-300/75 drop-shadow-xl"}>
                <div className={"flex flex-row p-2 space-x-2"}>
                    <img src="/logo.png" alt="logo" className={"h-full drop-shadow-xl"}/>
                    <span className={"p-1 text-xl font-sans drop-shadow-xl"}>Keeper-App</span>
                </div>
                <div className={"flex flex-row"}>
                    {!authModal ?
                        <button
                            onClick={() => setAuthModal(true)}
                            className={"bg-white rounded-full p-2 px-6 text-sm hover:scale-90 drop-shadow-2xl"}>
                            login/SignIn
                        </button>
                        : <div className={"flex flex-row pr-4 space-x-4"}>
                            <button className={"bg-white rounded-full p-2 px-6 text-sm hover:scale-90 drop-shadow-2xl"}>
                                logout
                            </button>
                            <img
                                className={"rounded-full h-fit w-12 drop-shadow-2xl hover:scale-110"}
                                src={"https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/profile-icon.png"}
                                alt={"profile pic"}/>
                        </div>}
                </div>
            </nav>
        </>
    )
}