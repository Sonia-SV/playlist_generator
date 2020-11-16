import React from 'react';
import Playlist from './Playlist';
import Moodlist from './MoodList';
import Grid from '@material-ui/core/Grid';
import { useStateValue } from "../Context/StateProvider";


function PlaylistList() {
  const [{playlists}] = useStateValue();
    const singlePlaylist = playlists.map((list) => {
    return (
      <Playlist
        list={list} key={list.id}
      />
    );
  });
  return (
    <>
    <Grid container direction="row" justify="center"
    alignItems="center"
    spacing={3}>
    {singlePlaylist}
    </Grid>
    </>
  );
}

export default PlaylistList;

