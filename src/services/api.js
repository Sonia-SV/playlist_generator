import { getTokenFromUrl } from './spotify';
const hash = getTokenFromUrl();

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

  return userId.id;
}

// const request = new Request(`https://api.spotify.com/v1/users/${userId.id}/playlists`, {
//     method: 'GET',
//     headers,
// });



const getPlaylist = async (user) => {

 const getUserPlaylist = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`);
  const playlists = await getUserPlaylist.json();
  
    return playlists;
};

export { getPlaylist, getUser };