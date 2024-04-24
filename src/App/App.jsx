import './App.css'
import Button from '../Button/Button.jsx'
import Header from '../Header.jsx'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { isLoggedIn } from '../auth.js'
import LoggedIn from '../LoggedIn/LoggedIn.jsx'
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn.jsx';

function App() {
  if(isLoggedIn()) {
    return <LoggedIn />
  } else {
    return (
      <NotLoggedIn />
    )
  }
}

export default App
