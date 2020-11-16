export const initialState = {
    there_is_token: false,
    user: null,
    playlists: [],
    current_playlist: null,
    songs: [],
    is_happy: false,
    top_tracks_list: [],
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_THERE_IS_TOKEN":
            return {
                ...state,
                there_is_token: action.there_is_token,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
        };
        case "SET_CURRENT_PLAYLIST":
                return {
                    ...state,
                    current_playlist: action.current_playlist,
                };
            case "SET_SONGS":
                return {
                    ...state,
                    songs: action.songs,
                };
            case "SET_IS_HAPPY":
                return {
                    ...state,
                    is_happy: action.is_happy,
                };
            case 'SET_TOP_TRACKS_LIST': 
                return {
                    ...state,
                    top_tracks_list: action.top_tracks_list,
                }
        default:
            return state;
    }
};

export default reducer;