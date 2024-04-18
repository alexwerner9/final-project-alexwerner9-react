
import React, { Component, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header.jsx'
import TrackPane from '../TrackPane/TrackPane.jsx'
import Button from '../Button/Button.jsx'
import './Playlist.css'

function Playlist() {
    const navigate = useNavigate()
    const { playlistUuid } = useParams();
    const [playlist, setPlaylist] = useState({})
    const [tracks, setTracks] = useState([])
    playlist.tracks = []

    useEffect(() => {
        async function getPlaylist() {
            const resp = await fetch(import.meta.env.VITE_API_URL+'/getplaylist?playlistUuid='+playlistUuid)
            const respJson = await resp.json()
            setPlaylist(respJson)
            setTracks(respJson.tracks)
        }
        getPlaylist()
    }, [])

    async function deletePlaylist() {
        const resp = await fetch(import.meta.env.VITE_API_URL+'/deleteplaylist', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playlistUuid: playlistUuid,
                loginToken: localStorage.getItem('loginToken')
            })
        })
        const respJson = await resp.json()
        navigate('/myplaylists')
    }

    return (
        <div className="columns">
            <Header text={playlist.playlistName} />
            <div className="rows">
                <div className="columns" id="left-panel">
                    <Button clickEvent={() => navigate('/addsong/'+playlistUuid)} text="Add a song" />
                    <Button text="Delete" clickEvent={deletePlaylist} />
                </div>
                <TrackPane tracks={tracks} />
            </div>
        </div>
    )
}

export default Playlist
