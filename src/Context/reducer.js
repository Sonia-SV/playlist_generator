export const initialState = {
  there_is_token: false,
  user: null,
  playlists: [],
  current_playlist: null,
  songs: [],
  is_new_playlist: false,
  top_tracks_list: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_THERE_IS_TOKEN':
      return {
        ...state,
        there_is_token: action.there_is_token,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        current_playlist: action.current_playlist,
      };
    case 'SET_NEW_PLAYLIST':
      return {
        ...state,
        is_new_playlist: action.is_new_playlist,
      };
    default:
      return state;
  }
};

export default reducer;
