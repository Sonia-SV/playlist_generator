import React, { useEffect, useState } from 'react';
import Login from './Login';
import UserSpace from './UserSpace';
import { getTokenFromUrl } from '../services/spotify';
import { getUser, getPlaylist } from '../services/api';

function App() {
const [token, setToken] = useState('');
const [user, setUser] = useState('');
const [playlist, setPlaylist] = useState([]);
const [isLogged, setIsLogged] = useState(false)


useEffect(() => {
  window.location.hash = "";
// setToken(getTokenFromUrl());
//   if (token) {
    getUser().then((user) => setUser(user));
    if(user) {
      getPlaylist(user).then((playlist) => setPlaylist(playlist.items));
      setIsLogged(true);
    }  else {
    getUser().then((user) => setUser(user));
  }
}, [user]);


  return (
    <div className="app">
      {isLogged ? <UserSpace playlist={playlist}/> : <Login />}
      
    </div>
  );
};

export default App;
