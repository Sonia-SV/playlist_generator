import React, { useEffect, useState } from 'react';
import Login from './Login';
import UserSpace from './UserSpace';
import { getTokenFromUrl } from '../services/spotify';
import { getUser, getPlaylist } from '../services/api';

function App() {
const [thereIsToken, setThereIsToken] = useState(false);
const [user, setUser] = useState('');
const [playlist, setPlaylist] = useState([]);
// const [isLogged, setIsLogged] = useState(false)

const hash = getTokenFromUrl();
useEffect(() => {
  if (hash.access_token !== undefined) {
    setThereIsToken(true);
  };

  if(thereIsToken) {
    getUser().then((user) => setUser(user));
    if(user) {
      getPlaylist(user).then((playlist) => setPlaylist(playlist.items));
      window.location.hash = "";
    }
    }
}, [hash.access_token, thereIsToken, user]);

  return (
    <div className="app">
      {thereIsToken ? <UserSpace playlist={playlist}/> : <Login />}
    </div>
  );
};

export default App;
