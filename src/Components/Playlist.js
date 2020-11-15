import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { getSongs, getTopTracks, getAudioFeatures, postPlaylist } from '../services/api';
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

function Playlist(props) {
  const [currentPlaylist, setCurrentPlaylist] = useState('');
  const [songs, setSongs] = useState([]);
  const [isHappy, setIsHappy] = useState('');
  const [topTracksList, setTopTracksList] = useState([]);
  const classes = useStyles();
  // const theme = useTheme();
  const cover = props.list.images[0] !== undefined ? props.list.images[0].url : 'https://via.placeholder.com/640';

  const getTarget = async (ev) => {
  setCurrentPlaylist(props.list.name);
  getSongs(props.list.tracks.href).then((songs) => {

    if(songs.items.length > 20) {

      const randomSongsIndex = [];

      for (let i = 0; i < 20; i++) {
        let randomIndex = songs.items[Math.floor(Math.random() * songs.items.length)];
        randomSongsIndex.push(randomIndex);
        }
        setSongs(randomSongsIndex)
    } else {
      setSongs(songs.items);
    }

  });
    getMood(ev);
    await saveTopTracks();
    await saveAudioFeatures();
  };

  const saveTopTracks = async () => {
    const topTracks = [];
    for (let song of songs) {
      const tracks = await getTopTracks(song.track.artists[0].id);
      topTracks.push(tracks);
    };

    setTopTracksList(topTracks);
  };

const saveAudioFeatures = async () => {
  const songsToPlaylist = [];
  for (let artist of topTracksList) {
    const artistInfo = {};
    for (let song of artist) {
      const features = await getAudioFeatures(song);
      const mood = isHappy ? features.danceability : features.valence;
      artistInfo[features.id] = mood;
    }
  
    const keysSorted = Object.keys(artistInfo).sort(function(a,b){return artistInfo[isHappy ? b : a]-artistInfo[isHappy ? a : b]});
    songsToPlaylist.push(keysSorted[0]);
  }
  const uris = songsToPlaylist.map((track) => `spotify:track:${track}`).join(',')


  if(songsToPlaylist.length > 0){
    const createPlaylist = await postPlaylist(currentPlaylist, isHappy, props.user, uris)};
};

  const setMood = (clickedId) => {
    if(clickedId === 'happy') {
      setIsHappy(true)
      console.log(clickedId)

    } else if (clickedId === 'sad') {
      setIsHappy(false)
      console.log(clickedId)
    }
  };

  const getMood = (ev) => {
    let clickedId = ev.currentTarget.id;
    setMood(clickedId);
  };

  return (
    <Grid item xs={12} sm={6} md={4} >
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.list.name}
            </Typography>
          </CardContent>
          {/* <div className={classes.controls}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div> */}
          <div>
            <IconButton aria-label="satisfied" onClick={getTarget} id="happy" >
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
          title={props.list.name}
        />
      </Card>
      </Grid>
  );
}


export default Playlist;

