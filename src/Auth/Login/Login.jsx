
import Button from '../../Common/Button/Button.jsx'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Header from '../../Common/Header/Header.jsx'

function Login() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState("");
    
    async function loginClickEvent() {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        if(!username || !password) {
            setAuthError("You must enter username and password.")
            return
        }

        const resp = await fetch(import.meta.env.VITE_API_URL+'/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const respJson = await resp.json()
        const loginToken = respJson['loginToken']
        if(loginToken) {
            localStorage.setItem('loginToken', loginToken)
            navigate('/')
        } else {
            setAuthError("Authentication failed.")
        }
    }

    function navigateToCreateaccount() {
        navigate('/createaccount')
    }

    function enterPressed(evt) {
        if(evt.key == 'Enter') {
            loginClickEvent()
        }
    }

    return(
        <div className="columns">
            <Header text="Log in" />
            {authError && <div className="error">{authError}</div>}
            <input id="username" placeholder="Username" onKeyUp={enterPressed}></input>
            <input id="password" type="password"  placeholder="Password" onKeyUp={enterPressed}></input>
            <Button clickEvent={loginClickEvent} text="Log in"></Button>
            <a onClick={navigateToCreateaccount}>Or, create an account</a>
        </div>
    )
}

export default Login
