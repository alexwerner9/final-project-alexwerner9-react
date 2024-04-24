
import React, { Component, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Common/Header/Header.jsx'
import TrackPane from '../TrackPane/TrackPane.jsx'
import Button from '../../Common/Button/Button.jsx'
import Divider from '../../Common/Divider/Divider.jsx'
import './Playlist.css'

function Playlist() {
    const navigate = useNavigate()
    const { playlistUuid } = useParams();
    const [playlist, setPlaylist] = useState({})
    const [tracks, setTracks] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [copyButtonText, setCopyButtonText] = useState("Copy share link")
    playlist.tracks = []

    useEffect(() => {
        async function getPlaylist() {
            const resp = await fetch(import.meta.env.VITE_API_URL+'/getplaylist?'+new URLSearchParams({
                playlistUuid: playlistUuid,
                loginToken: localStorage.getItem('loginToken')
            }))
            const respJson = await resp.json()
            const isOwner = respJson.isOwner
            const fetchedPlaylist = respJson.playlist
            setPlaylist(fetchedPlaylist)
            setTracks(fetchedPlaylist.tracks)
            console.log("RESP", respJson.isOwner)
            setIsOwner(isOwner)
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

    function copyLink() {
        const copyText = window.location.href
        const element = document.createElement("textarea");
        element.value = copyText;
        document.body.appendChild(element)
        element.select();
        document.execCommand("copy");
        document.body.removeChild(element);
        setCopyButtonText("Copied!")
        setTimeout(() => setCopyButtonText("Copy share link"), 1500)
    }

    console.log(isOwner)
    const deleteButton = isOwner ? <Button text="Delete" style={{border: "2px solid red"}} clickEvent={deletePlaylist} /> : <></>

    return (
        <div className="columns">
            <Header text={playlist.playlistName} />
            <div className="rows">
                <div className="columns" id="left-panel">
                    <Button style={{width: "15rem"}} text={copyButtonText} clickEvent={copyLink} />
                    <Divider direction="row" />
                    <Button clickEvent={() => navigate('/addsong/'+playlistUuid)} text="Add a song" />
                    {deleteButton}
                </div>
                <TrackPane tracks={tracks} />
            </div>
        </div>
    )
}

export default Playlist
