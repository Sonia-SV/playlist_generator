import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import {
  getSongs, getTopTracks, getAudioFeatures, postPlaylist, postFillPlaylist,
} from '../services/api';
import { useStateValue } from '../Context/StateProvider';
import { useStyles, cardStyle } from './Styles';
// import MoodList from './MoodList';



function Playlist({ list }) {
  const [{ user, playlists, is_mood, is_new_playlist }, dispatch] = useStateValue();

  const classes = useStyles();
  const cover = list.images[0] !== undefined ? list.images[0].url : 'https://via.placeholder.com/640';

  const getTarget = async (ev) => {
    dispatch({ type: 'SET_MOOD', is_mood: true});
    const mood = getMood(ev);
    const playlistName = list.name;
    const artistFromPlaylist = await getSongsFromPlaylist();
    const fetchTopTracks = await saveTopTracks(artistFromPlaylist);
    const postList = await createPlaylist(mood, playlistName);
    const fetchAudioFeatures = await saveAudioFeatures(fetchTopTracks, mood);
    const finishPlaylist = await addSongsPlaylist(fetchAudioFeatures, postList);
  };

  const getSongsFromPlaylist = async () => {
    const songs = await getSongs(list.tracks.href);
    const artistSongsIds = songs.items.map((song) => song.track.artists[0].id);
    const setArtistId = new Set(artistSongsIds);
    const arrayArtistId = Array.from(setArtistId);

    if (arrayArtistId.length > 10) {
      const randomSongsIndex = [];

      for (let i = 0; i < 10; i += 1) {
        const randomIndex = arrayArtistId[Math.floor(Math.random() * arrayArtistId.length)];
        randomSongsIndex.push(randomIndex);
      }
      return randomSongsIndex;
    }
    return arrayArtistId;
  };

  const saveTopTracks = async (songs) => {
    const topTracks = [];
    for (let song of songs) {
      const tracks = await getTopTracks(song);
      topTracks.push(tracks);
    }
    return topTracks;
  };

  const createPlaylist = async (mood, playlistName) => {
    const createList = await postPlaylist(playlistName, mood, user);
    return createList.id;

  };

  const addSongsPlaylist = async (arrayOfSongs, playlistId) => {
    const uris = arrayOfSongs.map((track) => `spotify:track:${track}`).join(',');
        if (arrayOfSongs.length > 0) {
          postFillPlaylist(user, uris, playlistId)
        }
        dispatch({ type: 'SET_NEW_PLAYLIST', is_new_playlist: true });
        dispatch({ type: 'NEW_PLAYLIST_ID', new_playlist_id: playlistId })
  }

  const saveAudioFeatures = async (top_tracks_list, mood) => {
    const songsToPlaylist = [];
    for (const artist of top_tracks_list) {
      const artistInfo = {};
      for (let song of artist) {
        const features = await getAudioFeatures(song);
        const moodSelector = mood ? features.danceability : features.valence;
        artistInfo[features.id] = moodSelector ;
      }

      const keysSorted = Object.keys(artistInfo)
        .sort (function (a, b) {
          return artistInfo[mood ? b : a] - artistInfo[mood ? a : b];
        });
      songsToPlaylist.push(keysSorted[0]);
    }
    return songsToPlaylist;
  };

  const getMood = (ev) => {
    const clickedId = ev.currentTarget.id;
    return clickedId === 'happy';
  };

  return (
    <Grid item xs={6} sm={6} md={4}
    align="center"
>

      <Card style={cardStyle} className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {list.name}
            </Typography>
          </CardContent>
          <div>
            <IconButton aria-label="satisfied" onClick={getTarget} id="happy">
              <SentimentVerySatisfiedIcon />
            </IconButton>
            <IconButton aria-label="dissatisfied" onClick={getTarget} id="sad">
              <SentimentVeryDissatisfiedIcon />
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={cover}
          title={list.name}
        />
      </Card>
    </Grid>
  );
}

export default Playlist;
