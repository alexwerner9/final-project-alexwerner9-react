
import Button from '../Button/Button.jsx'
import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Header.jsx'

function CreatePlaylist(props) {
    const navigate = useNavigate()
    
    async function createplaylistClickEvent() {
        const playlistName = document.getElementById('playlistName').value
        const loginToken = localStorage.getItem('loginToken')
        const resp = await fetch(import.meta.env.VITE_API_URL+'/createplaylist', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                loginToken: loginToken,
                playlistName: playlistName
            })
        })
        const respJson = await resp.json();
        if(respJson['error']) {
            console.log(respJson['error'])
        } else {
            const playlistUuid = respJson['playlistUuid']
            navigate('/playlist/'+playlistUuid)
        }
    }

    return (
        <div className="columns">
            <Header text="Create a playlist" />
            <input id="playlistName" placeholder="Playlist name"/>
            <Button text="Create" clickEvent={createplaylistClickEvent} />
        </div>
    )
}

export default CreatePlaylist
