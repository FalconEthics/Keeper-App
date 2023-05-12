// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPp2EeRWkmXuFmw-j5zH5m1nE5NLSkhco",
    authDomain: "the-keeper-app-fe.firebaseapp.com",
    projectId: "the-keeper-app-fe",
    storageBucket: "the-keeper-app-fe.appspot.com",
    messagingSenderId: "477264507562",
    appId: "1:477264507562:web:4e5d0893de0961a46e56d3",
    measurementId: "G-K1L8YZRYTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();