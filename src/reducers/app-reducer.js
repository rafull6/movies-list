export const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.movies, tabName: action.tabName };
        case 'SET_SEARCH_VALUE':
            return { ...state, searchValue: action.value };
        case 'SET_LOADING':
            return { ...state, loading: action.loading };
        case 'SET_TABNAME':
            return { ...state, tabName: action.name };
        case 'SET_DEBOUNCE_SUCCESS':
            return { ...state, tabName: action.name };
        case 'SET_FAVOURITES':
            return { ...state, tabName: action.favourites };
        default:
            throw new Error();
    }
};
