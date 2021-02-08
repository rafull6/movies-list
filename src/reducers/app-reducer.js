import {
    SET_DEBOUNCE_SUCCESS,
    SET_LOADING,
    SET_MOVIES,
    SET_SEARCH_VALUE,
    SET_TABNAME,
    UPDATE_STATE_LIST,
} from './action-types';

export const initialState = {
    favourites: [],
    watchLater: [],
    movies: [],
    searchValue: '',
    tabName: '',
    loading: false,
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case SET_MOVIES:
            return { ...state, movies: action.movies, tabName: action.tabName };
        case SET_SEARCH_VALUE:
            return { ...state, searchValue: action.value };
        case SET_LOADING:
            return { ...state, loading: action.loading };
        case SET_TABNAME:
            return { ...state, tabName: action.name };
        case SET_DEBOUNCE_SUCCESS:
            return { ...state, tabName: action.name };
        case UPDATE_STATE_LIST:
            console.log(action);
            return {
                ...state,
                [action.listName]: action.updatedList,
            };
        default:
            throw new Error();
    }
};
