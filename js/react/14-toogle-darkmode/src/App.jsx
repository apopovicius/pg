import React from "react"
import Main from "./components/Main"
import Navbar from "./components/Navbar"

export default function App() {
    const [darkMode, setDarkMode] = React.useState(false)
    function toggleDarkMode() {
      setDarkMode( prevMode => !prevMode );
    }
    return (
        <div className="container">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <Main darkMode={darkMode}/>
        </div>
    )
}
