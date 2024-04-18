import Button from '../Button/Button.jsx'
import Header from '../Header.jsx'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function MyPlaylists(props) {
    const navigate = useNavigate()
    const [playlists, setPlaylists] = useState([])

    function playlistClickEvent(evt) {
        const url = '/playlist/'+evt.target.id
        navigate(url);
    }

    useEffect(() => {
        async function getPlaylists() {
            const resp = await fetch(import.meta.env.VITE_API_URL+'/getplaylists/'+localStorage.getItem('loginToken'))
            const respJson = await resp.json()
            setPlaylists(respJson)
        }
        getPlaylists()
    }, [])

    let ret = <div className="columns">
        <Header text="My Playlists" />
        {playlists.map((val) => <Button clickEvent={playlistClickEvent} text={val.playlistName} id={val.playlistUuid} key={val.playlistUuid} />)}
    </div>
    return ret;
}

export default MyPlaylists
