
import Button from '../Button/Button.jsx'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Header from '../Header.jsx'

function Login() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(false);
    async function loginClickEvent(evt) {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

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
            setAuthError(true)
        }
    }

    function navigateToCreateaccount() {
        navigate('/createaccount')
    }

    return(
        <div className="columns">
            <Header text="Log in" />
            {authError && <div class="error">Authentication failed</div>}
            <input id="username" placeholder="Username"></input>
            <input id="password" type="password"  placeholder="Password"></input>
            <Button clickEvent={loginClickEvent} text="Log in"></Button>
            <a onClick={navigateToCreateaccount}>Or, create an account</a>
        </div>
    )
}

export default Login
