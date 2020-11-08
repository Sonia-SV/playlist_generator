import React from 'react';
import Playlist from './Playlist';
import Grid from '@material-ui/core/Grid';

function PlaylistList(props) {
    const singlePlaylist = props.playlist.map((list) => {
    return (
      <Playlist
        list={list}
      />
    );
  });
  return (
    <Grid container direction="row" justify="center"
    alignItems="center"
    spacing={3}>
    {singlePlaylist}</Grid>
  );
}

export default PlaylistList;

