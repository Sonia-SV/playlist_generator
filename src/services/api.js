import { PlaylistAddCheckOutlined } from '@material-ui/icons';
import { getTokenFromUrl } from './spotify';
import { happyBase64, sadBase64 } from '../images/cover-base64'
// import happy from '../images/cover-happy.jpg';
// import sad from '../images/cover-sad.jpg';

const hash = getTokenFromUrl();

const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${hash.access_token}`,
});

const user = new Request('https://api.spotify.com/v1/me', {
  method: 'GET',
  headers,
});

const getUser = async () => {
  const getUserInfo = await fetch(user);
  const userId = await getUserInfo.json();

  return userId;
};

const getPlaylist = async (userId) => {
  const getUserPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
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

const getAudioFeatures = async (songId) => {
  const getSongAudioFeatures = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, {
    method: 'GET',
    headers,
  });
  const audioFeatures = await getSongAudioFeatures.json();
  return audioFeatures;
};

const getTopTracks = async (artistId) => {
  const getArtistTopTracks = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
    method: 'GET',
    headers,
  });

  const topTracks = await getArtistTopTracks.json();
  const tracks = [];
  for (const track of topTracks.tracks) {
    tracks.push(track.id);
  }
  return tracks;
};

const postPlaylist = async (name, mood, userId) => {
  // Create empty playlist and retrieve endpoint
  const emptyPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/`, {
    method: 'POST',
    body: JSON.stringify({
      name: `${name} ${mood === true ? '🙃 Mezcladito contento' : '🥺 Mezcladito triste'}`,
      public: false,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${hash.access_token}`,
    },
  })
  const playlistInfo = await emptyPlaylist.json();
  console.log(playlistInfo);
  return playlistInfo;
    // .then((response) => response.json())
    // .then(async (response) => {
    //   const playlistImage = await fetch(`https://api.spotify.com/v1/playlists/${response.id}/images`, {
    //       method: 'PUT',
    //       body: JSON.stringify({
    //         images: mood === true ? {happyBase64} : {sadBase64},
    //       }),
    //       headers: {
    //         'Content-Type': 'image/jpg',
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${hash.access_token}`,
    //       },
    //     });
    // });
};


const postFillPlaylist = async (userId, tracks, playlistId) => {
 const fillPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?uris=${tracks}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hash.access_token}`,
        },
      });
}


export {
  getPlaylist, getUser, getSongs, getTopTracks, getAudioFeatures, postPlaylist, postFillPlaylist
};
