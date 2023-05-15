import {FcGoogle, GoMarkGithub} from "react-icons/all.js";
import {UserContext} from "../../store/UserContext.jsx";
import {useContext} from "react";
import {auth, googleProvider} from "../../store/firebaseConfig.js";
import {signInWithPopup} from "firebase/auth";

export function AuthModal() {
    //toggle auth modal
    const {setAuthModal} = useContext(UserContext);
    const signInWithGoogle = async () => {
        //firebase auth with google provider
        console.log("signInWithGoogle triggered")
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div
                onClick={() =>
                    //close auth modal when clicked outside of modal i.e. in backdrop
                    setAuthModal(false)}
                className={"fixed overscroll-none top-0 left-0 bg-gray-500 w-screen h-screen z-10 bg-opacity-80 flex items-center justify-center"}>
                <div
                    // main modal
                    id={"modal"}
                    className={"flex flex-col sm:flex-row bg-white w-fit p-10 space-y-8 sm:space-x-8 sm:space-y-0 rounded-2xl drop-shadow-2xl"}>
                    <button
                        onClick={
                        //close auth modal when clicked on close button and popup the login with google modal
                        signInWithGoogle}
                        className={"bg-gray-100 p-6 rounded-2xl text-center content-center flex flex-col space-y-4 items-center drop-shadow-2xl hover:scale-90"}>
                        <FcGoogle className={"w-1/2 h-fit"}/>
                        <span className={"text-sm"}>Sign/Login in with Google</span>
                    </button>
                    <button
                        onClick={() => {
                            //was having issues with github auth so i disabled it for now
                            alert("Coming Soon!")}}
                        className={"bg-gray-100 p-6 rounded-2xl text-center content-center flex flex-col space-y-4 items-center drop-shadow-2xl hover:scale-90"}>
                        <GoMarkGithub className={"w-1/2 h-fit"}/>
                        <span className={"text-sm"}>Sign/Login in with Github</span>
                    </button>
                </div>
            </div>
        </div>
    )
}