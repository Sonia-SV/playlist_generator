import React, { useEffect } from 'react';
import Login from './Login';
import UserSpace from './UserSpace';
import { getTokenFromUrl } from '../services/spotify';
import { getUser, getPlaylist } from '../services/api';
import { useStateValue } from "../Context/StateProvider";

function App() {
  const [{user, there_is_token}, dispatch] = useStateValue();

  const hash = getTokenFromUrl();
  useEffect(() => {
    if (hash.access_token !== undefined) {
      dispatch({
          type: "SET_THERE_IS_TOKEN",
          there_is_token: true,
        })
    };

    if(there_is_token) {
      getUser().then((_user) => {
        dispatch({
          type: "SET_USER",
          user: _user.id,
        })
      });
      if(user) {
        getPlaylist(user).then((_playlists) => {
          dispatch({
          type: "SET_PLAYLISTS",
          playlists: _playlists.items,
        });
      });
        window.location.hash = "";
      }
      }
  }, [hash.access_token, there_is_token, user]);

    return (
      <div className="app">
        {there_is_token ? <UserSpace/> : <Login />}
      </div>
    );
};

export default App;
