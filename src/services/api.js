import { getTokenFromUrl } from './spotify';
const hash = getTokenFromUrl();

const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${hash.access_token}`
});




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

 const getUserPlaylist = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
   method: 'GET',
    headers,
 });
  const playlists = await getUserPlaylist.json();
  
    return playlists;
};
const getSongs = async (url) => {

const getUserSongs = await fetch(url, {
  method: 'GET',
  headers,
});
  const songs = await getUserSongs.json();
    return songs;
};

const getAudioFeatures = async (songId, songName, artistName) => {
  const getSongAudioFeatures = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, {
   method: 'GET',
    headers,
 });
  const audioFeatures = await getSongAudioFeatures.json();
  console.log(artistName, songName, audioFeatures);
  return audioFeatures
}

const getTopTracks = async (artistId) => {
  const getArtistTopTracks = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
    method: 'GET',
    headers,
  });

  const topTracks = await getArtistTopTracks.json();
  const tracks = [];
  // topTracks.tracks.forEach((song) => getAudioFeatures(song.id, song.name, artistName));
  for (let track of topTracks.tracks) {
    tracks.push(track.id)
  }
  return tracks;
}


export { getPlaylist, getUser, getSongs, getTopTracks };

