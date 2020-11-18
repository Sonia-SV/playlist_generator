import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { getSongs, getTopTracks, getAudioFeatures, postPlaylist } from '../services/api';
import { useStateValue } from '../Context/StateProvider';
import MoodList from './MoodList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function Playlist( { list } ) {
  const [{user, current_playlist, is_happy }, dispatch] = useStateValue();

  const classes = useStyles();
  const cover = list.images[0] !== undefined ? list.images[0].url : 'https://via.placeholder.com/640';

  const getTarget = async (ev) => {
    const mood = getMood(ev);
    const playlistName = list.name;
    const artistFromPlaylist = await getSongsFromPlaylist();
    const fetchTopTracks = await saveTopTracks(artistFromPlaylist);
    const fetchAudioFeatures = await saveAudioFeatures(fetchTopTracks);
    const postPlaylist = await createPlaylist(fetchAudioFeatures, mood, playlistName);
  }

  const getSongsFromPlaylist = async () => {
    const songs = await getSongs(list.tracks.href)
    const artistSongsIds = songs.items.map((song) => song.track.artists[0].id);
    const setArtistId = new Set(artistSongsIds);
    const arrayArtistId = Array.from(setArtistId);

    if(arrayArtistId.length > 10) {

      const randomSongsIndex = [];

      for (let i = 0; i < 10; i++) {
        let randomIndex = arrayArtistId[Math.floor(Math.random() * arrayArtistId.length)];
        randomSongsIndex.push(randomIndex);
      }
      return randomSongsIndex;
    } else {
      return arrayArtistId;
    };
  }
  const saveTopTracks = async (songs) => {
    const topTracks = [];
    for (let song of songs) {
      const tracks = await getTopTracks(song);
      topTracks.push(tracks);
    };
    return topTracks;
  };

  const createPlaylist = async (arrayOfSongs, mood, playlistName) => {
    console.log(current_playlist);
    const uris = arrayOfSongs.map((track) => `spotify:track:${track}`).join(',')
    if(arrayOfSongs.length > 0){
      const createPlaylist = await postPlaylist(playlistName, mood, user, uris)};
  };

  const saveAudioFeatures = async (top_tracks_list) => {
    console.log(is_happy);
    const songsToPlaylist = [];
    for (let artist of top_tracks_list) {
      const artistInfo = {};
        for (let song of artist) {
          const features = await getAudioFeatures(song);
          const mood = is_happy ? features.danceability : features.valence;
          artistInfo[features.id] = mood;
        };

    const keysSorted = Object.keys(artistInfo)
      .sort(function(a,b){
      return artistInfo[is_happy ? b : a]-artistInfo[is_happy ? a : b]});

      songsToPlaylist.push(keysSorted[0]);
    };
    return songsToPlaylist;
  };

  const getMood = (ev) => {
    let clickedId = ev.currentTarget.id;
    return clickedId === 'happy' ? true : false;
  };

  return (
    <Grid item xs={12} sm={6} md={4} >
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              {list.name}
            </Typography>
          </CardContent>
          <div>
            <IconButton aria-label='satisfied' onClick={getTarget} id='happy' >
              <SentimentVerySatisfiedIcon />
            </IconButton>
            <IconButton aria-label='dissatisfied' onClick={getTarget} id='sad'>
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
};

export default Playlist;

