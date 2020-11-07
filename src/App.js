import React, { useEffect } from 'react';
import Login from './Login';
import { getTokenFromUrl } from './spotify';

function App() {
  useEffect(() => {
    // Set token
const hash = getTokenFromUrl();
console.log(hash);

const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${hash.access_token}`
});

// user.id


const user = new Request(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers,
});

const getUser = async() => {
  const getUserInfo = await fetch(user);
  const userId = await getUserInfo.json();

  return userId
}

const request = new Request(`https://api.spotify.com/v1/users/${userId.id}/playlists`, {
    method: 'GET',
    headers,
});



const getPlaylist = async () => {

 const getUserPlaylist = await fetch(request);
  const playlists = await getUserPlaylist.json();
  
    return console.log(playlists)
}
getUser();
getPlaylist();
    // window.location.hash = "";



  }, []);

  return (
    <div className="app">
      <Login />
    </div>
  );
};

export default App;
