export const initialState = {
  token: '',
  there_is_token: false,
  user: null,
  playlists: [],
  current_playlist: null,
  songs: [],
  is_new_playlist: false,
  is_mood: false,
  top_tracks_list: [],
  new_playlist_id: '',
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
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
    case 'SET_MOOD':
      return {
        ...state,
        is_mood: action.is_mood,
      };
    case 'NEW_PLAYLIST_ID':
      return {
        ...state,
        new_playlist_id: action.new_playlist_id,
      };
    default:
      return state;
  }
};

export default reducer;
