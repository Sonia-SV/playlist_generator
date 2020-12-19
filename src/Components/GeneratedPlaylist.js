import React from 'react';
import { useStateValue } from '../Context/StateProvider';
import { renderNewPlaylist } from '../services/api';


function GeneratedPlaylist() {
  const [{ is_new_playlist, new_playlist_id }, dispatch] = useStateValue();

  // const paintNewPlaylist = async () => {
  //   const newPlaylist = await renderNewPlaylist(new_playlist_id);
  //   return newPlaylist;
  // };
  // paintNewPlaylist();
  // const prueba = await paintNewPlaylist();
  // console.log(prueba);

  const widget = <iframe src={`https://open.spotify.com/embed/playlist/${new_playlist_id}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>;
 return (
  <>
  <main className="main">
    {new_playlist_id.length > 0 ?
     widget : ''
    }

  </main>

</>
);
}

// https://api.spotify.com/v1/playlists/05zGz2A3P5DIDtTCRNDxdD/tracks?offset=0&limit=100

export default GeneratedPlaylist;
