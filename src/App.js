import React, { useEffect, useState } from 'react';
import Login from './Login';
import Playlist from './Playlist';
import { getTokenFromUrl } from './services/spotify';
import { getUser, getPlaylist } from './services/api';

function App() {
const [token, setToken] = useState('');
const [user, setUser] = useState('');
const [playlist, setPlaylist] = useState([]);




useEffect(() => {
  window.location.hash = "";
// setToken(getTokenFromUrl());
//   if (token) {
    getUser().then((user) => setUser(user));
    if(user) {
      console.log(user)
      getPlaylist(user).then((playlist) => setPlaylist(playlist.items));
      console.log(playlist)
    }  else {
    getUser().then((user) => setUser(user));
  }
}, [user]);

console.log(playlist);

  return (
    <div className="app">
      {playlist.length > 0 ? <Playlist/> : <Login />}
      
    </div>
  );
};

export default App;
