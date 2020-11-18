export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
// const redirectUri = window.location.href;
// Variable de entorno
const clientId = 'ca63b73f189140cd8772d476bab71bbd';

const scopes = [
  // 'user-read-currently-playing',
  // 'user-read-recently-played',
  // 'user-read-playback-state',
  // 'user-top-read',
  // 'user-modify-playback-state',
  'user-library-read',
  'playlist-read-private',
  'playlist-modify-private',
 ' playlist-modify-public',
];

export const getTokenFromUrl = () => window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, item) => {
    const parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  },
  {});

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes
  .join('%20')}&response_type=token&show_dialog=true`;
