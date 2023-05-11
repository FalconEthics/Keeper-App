import './App.css'
import {Nav} from "./components/Nav.jsx";
import {Body} from "./components/Body.jsx";
import {Footer} from "./components/Footer.jsx";
import UserContextProvider from "./store/UserContext.jsx";

function App() {

    return (
        <div className={"w-screen min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"}>
            <UserContextProvider>
                <Nav/>
                <Body/>
                <Footer/>
            </UserContextProvider>
        </div>
    )
}

export default App
