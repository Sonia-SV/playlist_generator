import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { getSongs, getTopTracks } from '../services/api';
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
  const [songs, setSongs] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);
  const [isHappy, setIsHappy] = useState('');
  const [topTracksList, setTopTracksList] = useState([]);
  const classes = useStyles();
  // const theme = useTheme();
  const cover = props.list.images[0] !== undefined ? props.list.images[0].url : 'https://via.placeholder.com/640';


  const getTarget = (ev) => {
    getSongs(props.list.tracks.href).then((songs) => setSongs(songs.items));
    getMood(ev);

    const songList = randomSongs !== [] ? randomSongs : songs;

    if(songList.length > 0) {
      console.log(songList);
     songList.map((song) => getTopTracks(song.track.artists[0].id).then((topTrackList) => setTopTracksList([...topTrackList])));
  } else {
    console.log('no tengo lista')
  }

  console.log(topTracksList);

  }

  // console.log(songs);
  // console.log(randomSongs);
  console.log(topTracksList);


  const setMood = (clickedId) => {
    if(clickedId === 'happy') {
      setIsHappy(true)
      console.log(clickedId)

    } else if (clickedId === 'sad') {
      setIsHappy(false)
      console.log(clickedId)
    }
  }

  const getMood = (ev) => {
    let clickedId = ev.currentTarget.id;
    setMood(clickedId);
  }

//SI EXISTE RANDOMSONGS SE REALIZA LA PETICIÓN CON RANDOM SONGS, SI NO SE HACE LA PETICIÓN CON SONGS.
  useEffect(() => {
    if(songs !== []) {
      const randomSongsIndex = [];
      if (songs.length > 20) {
      for (let i = 0; i < 20; i++) {
        let randomIndex = songs[Math.floor(Math.random() * songs.length)];
        randomSongsIndex.push(randomIndex);
        }
      setRandomSongs(randomSongsIndex);
      }
    }
  }, [songs]);


//   const topTracks = async  () => {
//     console.log('Top tracks');
//     const songList = randomSongs !== [] ? randomSongs : songs;
//     // console.log(songList.length);
//     if(songList.length > 0) {
//       console.log(songList);
//       await songList.map((song) => getTopTracks(song.track.artists[0].id).then((topTrackList) => setTopTracksList(topTrackList)));
//   }
// }
// topTracks();
// console.log(topTracksList);



//   songs.items.map((song) => getTopTracks(song.track.artists[0].id, song.track.artists[0].name));
// console.log(songs);
// }







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
      {/* <MoodList songs={songs.length > 20 ? randomSongs : songs} /> */}
      </Grid>
  );
}


export default Playlist;

