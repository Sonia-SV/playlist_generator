import React from 'react';
import Grid from '@material-ui/core/Grid';
import Playlist from './Playlist';
import Moodlist from './MoodList';
import { useStateValue } from '../Context/StateProvider';

function PlaylistList() {
  const [{ playlists }] = useStateValue();
  const singlePlaylist = playlists.map((list) => (
    <Playlist
      list={list}
      key={list.id}
    />
  ));
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        { singlePlaylist }
      </Grid>
    </>
  );
}

export default PlaylistList;
