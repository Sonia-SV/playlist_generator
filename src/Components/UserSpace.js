import React from 'react';
import Header from './Header';
import PlaylistList from './PlaylistList';
import GeneratedPlaylist from './GeneratedPlaylist';
import { useStateValue } from '../Context/StateProvider';


// is_new_

function UserSpace() {

  const [{ is_new_playlist }, dispatch] = useStateValue();

 return (
  <>
  <Header />
  {is_new_playlist ? <GeneratedPlaylist/> : <PlaylistList />}
</>
);
}

export default UserSpace;
