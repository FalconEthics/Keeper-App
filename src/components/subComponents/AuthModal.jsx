import {FcGoogle, GoMarkGithub} from "react-icons/all.js";
import {UserContext} from "../../store/UserContext.jsx";
import {useContext} from "react";
import {auth, googleProvider} from "../../store/firebaseConfig.js";
import {signInWithRedirect} from "firebase/auth";

export function AuthModal() {
    const {setAuthModal} = useContext(UserContext);
    const signInWithGoogle = async () => {
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div
                onClick={() => setAuthModal(false)}
                className={"fixed overscroll-none top-0 left-0 bg-gray-500 w-screen h-screen z-10 bg-opacity-80 flex items-center justify-center"}>
                <div
                    // onClick={(e) => {
                    //     e.stopPropagation();
                    // }}
                    id={"modal"}
                    className={"flex flex-col sm:flex-row bg-white w-fit p-10 space-y-8 sm:space-x-8 sm:space-y-0 rounded-2xl drop-shadow-2xl"}>
                    <button
                        onClick={signInWithGoogle}
                        className={"bg-gray-100 p-6 rounded-2xl text-center content-center flex flex-col space-y-4 items-center drop-shadow-2xl hover:scale-90"}>
                        <FcGoogle className={"w-1/2 h-fit"}/>
                        <span className={"text-sm"}>Sign/Login in with Google</span>
                    </button>
                    <button
                        onClick={() => {alert("Coming Soon!")}}
                        className={"bg-gray-100 p-6 rounded-2xl text-center content-center flex flex-col space-y-4 items-center drop-shadow-2xl hover:scale-90"}>
                        <GoMarkGithub className={"w-1/2 h-fit"}/>
                        <span className={"text-sm"}>Sign/Login in with Github</span>
                    </button>
                </div>
            </div>
        </div>
    )
}