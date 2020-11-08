import React from 'react';
import Navbar from './Navbar';
import PlaylistList from './PlaylistList';

function UserSpace(props) {
  return (
    <>
      <Navbar/>
      <PlaylistList playlist={props.playlist}/>
      </>
  );
}

export default UserSpace;
