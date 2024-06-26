import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'
import Login from './Auth/Login/Login.jsx'
import LoggedIn from './Home/LoggedIn/LoggedIn.jsx'
import CreateAccount from './Auth/CreateAccount/CreateAccount.jsx'
import CreatePlaylist from './Playlist/CreatePlaylist/CreatePlaylist.jsx'
import Playlist from './Playlist/Playlist/Playlist.jsx'
import MyPlaylists from './Playlist/MyPlaylists/MyPlaylists.jsx'
import AddSong from './Playlist/AddSong/AddSong.jsx'
import Button from './Common/Button/Button.jsx'
import './index.css'
import { isLoggedIn } from './auth.js'

import {
  Navigate, BrowserRouter,
  Routes, Route
} from "react-router-dom";

function ProtectedRoute(props) {
    if(!localStorage.getItem('loginToken')) {
      return <Navigate to="/" replace />;
    }
    return props.child;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Button id="home-button" text="Home" clickEvent={() => {window.location.href="/"}} />
    <BrowserRouter>
      <Routes>
        <Route index element={<App />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="createaccount" element={<CreateAccount />} />
        <Route path="myaccount" element={
          <ProtectedRoute child={<LoggedIn />} />
        } />
        <Route path="createplaylist" element={
          <ProtectedRoute child={<CreatePlaylist />} />
        } />
        <Route path="playlist/:playlistUuid" element={
          <Playlist />
        } />
        <Route path="addsong/:playlistUuid" element={
          <AddSong />
        } />
        <Route path="myplaylists" element={
          <ProtectedRoute child={<MyPlaylists />} />
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
