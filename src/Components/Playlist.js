import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { getSongs, getTopTracks } from '../services/api';

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
  const classes = useStyles();
  const theme = useTheme();
  const cover = props.list.images[0] !== undefined ? props.list.images[0].url : 'https://via.placeholder.com/640';


  const getTarget = () => {
    getSongs(props.list.tracks.href).then((songs) => setSongs(songs));
    // songsList();
  }

  console.log(songs.items);


// const songsList = () => {
//   console.log(songs)

//   if (songs.items.length > 20) {
//     for (let i = 0; i < 20; i++) {
//       console.log('Holi');
//       console.log(songs.items[Math.floor(Math.random() * songs.items.length)]);
//     }

//   }
// };
  useEffect(() => {
    console.log(songs)
    const randomSongsIndex = [];
  //   if (songs.limit > 20) {
  //   for (let i = 0; i < 20; i++) {
  //     let randomIndex = songs.items[Math.floor(Math.random() * songs.items.length)];
  //     randomSongsIndex.push(randomIndex)
  //     // console.log();
  //   }
  // }
  setRandomSongs(randomSongsIndex)
  });
  
  console.log(randomSongs);

//   songs.items.map((song) => getTopTracks(song.track.artists[0].id, song.track.artists[0].name));
// console.log(songs);
// }

// songsList();

  // useEffect(() => {
//   if (songs.items !== undefined) {
//     const songsList = songs.items.map((song) => getTopTracks(song.track.artists[0].id, song.track.artists[0].name));
//     console.log(songsList, 'song list')
//   }
//




  return (
    <Grid item xs={12} sm={6} md={4} onClick={getTarget} >
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
            <IconButton aria-label="more">
              <MoreHorizIcon />
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
