import React from 'react';
import Header from './Header';
import PlaylistList from './PlaylistList';

function UserSpace() {
  return (
    <>
      <Header />
      <main className="main">
      <PlaylistList />
      </main>
    </>
  );
}

export default UserSpace;
