import {useContext, useState} from "react";
import {UserContext} from "../store/UserContext.jsx";
import {auth} from "../store/firebaseConfig.js";
import {signOut} from "firebase/auth"


export function Nav() {
    const {setAuthModal, user} = useContext(UserContext);
    const [profileOptions, setProfileOptions] = useState(false);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <nav className={"flex flex-row h-20 p-4 justify-between bg-amber-300/75 drop-shadow-xl"}>
                <div className={"flex flex-row p-2 space-x-2"}>
                    <img src="/logo.png" alt="logo" className={"h-full drop-shadow-xl"}/>
                    <span className={"p-1 text-xl font-sans drop-shadow-xl"}>Keeper-App</span>
                </div>
                <div className={"flex flex-row"}>
                    {!user ?
                        <button
                            onClick={() => setAuthModal(true)}
                            className={"bg-white rounded-full p-2 px-6 text-sm hover:scale-90 drop-shadow-2xl"}>
                            login/SignIn
                        </button>
                        :
                        <div className={"flex flex-col pr-4 space-y-2"}>
                            <div className={"flex flex-row space-x-4 justify-end"}>
                                <button
                                    onClick={logout}
                                    className={"bg-white rounded-full p-2 px-6 text-sm hover:scale-90 drop-shadow-2xl"}>
                                    logout
                                </button>
                                <img
                                    onClick={() => {setProfileOptions(!profileOptions)}}
                                    className={"rounded-full h-fit w-12 drop-shadow-2xl hover:scale-110"}
                                    src={auth?.currentUser?.photoURL}
                                    alt={"profile pic"}/>
                            </div>
                            {profileOptions && <ul className={"bg-white rounded-2xl text-sm hidden lg:block"}>
                                <li className={"border-b-2 p-4"}>{auth?.currentUser?.displayName}</li>
                                <li className={"border-b-2 p-4"}>{auth?.currentUser?.email}</li>
                                <li className={"border-b-2 p-4"}>{auth?.currentUser?.metadata?.creationTime}</li>
                            </ul>}
                        </div>}
                </div>
            </nav>
        </>
    )
}