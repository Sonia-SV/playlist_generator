import React from 'react';
import Header from './Header';
import PlaylistList from './PlaylistList';
import { useStateValue } from '../Context/StateProvider';


// is_new_

function UserSpace() {

  const [{ is_new_playlist }, dispatch] = useStateValue();



    if(is_new_playlist) {
 return (
  <>
  <Header />
  <main className="main">
  ¡Abre tu Spotify, Maricarmen!
  </main>
</>
)
    } else {

      return (
      <>
      <Header />
      <main className="main">

      <PlaylistList />
      </main>
    </>
      )}

;
}

export default UserSpace;
