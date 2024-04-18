import Button from '../Button/Button.jsx'
import './LoggedIn.css'
import Header from '../Header.jsx'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function LoggedIn() {
    const navigate = useNavigate();
    const [text, setText] = useState("Hello")

    useEffect(() => {
        
    })

    async function getUsername() {
        console.log(import.meta.env)
        const resp = await fetch(import.meta.env.VITE_API_URL+'/getusername/'+localStorage.getItem('loginToken'))
        const respJson = await resp.json()
        console.log(respJson)
        const username = respJson['username']
        setText("Hello " + username)
    }
    getUsername()

    function logoutClickEvent() {
        localStorage.removeItem('loginToken')
        navigate('/')
    }

    function createplaylistClickEvent() {
        navigate('/createplaylist')
    }

    function myplaylistsClickEvent() {
        navigate('/myplaylists')
    }

    return (
        <div className="columns">
            <Header text={text} />
            <Button clickEvent={createplaylistClickEvent} text="Create a new playlist" />
            <Button clickEvent={myplaylistsClickEvent} text="My playlists" />
            <Button clickEvent={logoutClickEvent} text="Log out" />
        </div>
    )
}

export default LoggedIn
