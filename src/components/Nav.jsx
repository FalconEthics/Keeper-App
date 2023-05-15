import {useContext, useState} from "react";
import {UserContext} from "../store/UserContext.jsx";
import {auth} from "../store/firebaseConfig.js";
import {signOut} from "firebase/auth"
import {BsSearch} from "react-icons/all.js";


export function Nav() {
    const {setAuthModal, user, setSearch, searchOption, setSearchOption} = useContext(UserContext);
    const [profileOptions, setProfileOptions] = useState(false);


    const logout = async () => {
        console.log("logout triggered")
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <nav className={"flex flex-row h-20 p-4 justify-between bg-amber-300/75 drop-shadow-xl"}>
                <div className={"flex flex-row p-2"}>
                    <img src="/logo.png" alt="logo" className={"h-full drop-shadow-xl"}/>
                    <span className={"p-2 text-xs sm:text-xl font-sans drop-shadow-xl"}>Keeper-App</span>
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
                                {searchOption && <input type="text" onChange={(event) => {
                                    setSearch(event.target.value);
                                }} className={"absolute sm:static bottom-[-300%] left-2 rounded-full p-2 text-sm"} placeholder={" Search note title"}></input>}
                                <button onClick={() => {
                                    setSearchOption(!searchOption)
                                }}
                                        className={"text-3xl p-1 text-white hover:scale-110 drop-shadow-2xl"}>
                                    <BsSearch/>
                                </button>
                                <img
                                    onClick={() => {
                                        setProfileOptions(!profileOptions)
                                    }}
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