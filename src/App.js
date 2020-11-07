import React, { useEffect, useState } from 'react';
import Login from './Login';
import { getTokenFromUrl } from './services/spotify';
import { getUser, getPlaylist } from './services/api';

function App() {
const [token, setToken] = useState('');
const [user, setUser] = useState('');
const [playlist, setPlaylist] = useState([]);




useEffect(() => {
// setToken(getTokenFromUrl());
//   if (token) {
    getUser().then((user) => setUser(user));
    if(user) {
      console.log(user)
      getPlaylist(user).then((playlist) => console.log(playlist));
    } if (playlist) {
      console.log(playlist)
    // }
    
    
  } else {
    getUser().then((user) => setUser(user));
    // setToken(getTokenFromUrl());
    // getToken().then((data) => {
    //   setToken(data.token)
    // })
  }
}, [user]);


  return (
    <div className="app">
      <Login />
    </div>
  );
};

export default App;
