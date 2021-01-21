import React, {
    useEffect,
    useReducer,
    useState,
} from 'react';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';
import MoviesList from './components/MoviesList';
import {
    getMoviesByName,
    getMoviesPopular,
} from './utils/api';
import useDebounce from './hooks/use-debounce';
import { getStorage } from './utils/helpers';
import { appReducer } from './reducers/app-reducer';

const { TabPane } = Tabs;
const { Search } = Input;

const TABS = {
    POPULAR: 'Popular movies',
    RESULTS: 'Search results',
    FAVOURITES: 'Favourites',
    LATER: 'Watch later',
};

const initialState = {
    favourites: [],
    watchLater: [],
    movies: [],
    searchValue: '',
    tabName: '',
    loading: false,
};

const App = () => {
    const [state, dispatch] = useReducer(
        appReducer,
        initialState
    );
    const debounced = useDebounce(state.searchValue, 500);

    const onChange = (e) => {
        dispatch({
            type: 'SET_SEARCH_VALUE',
            value: e.target.value,
        });
    };

    const getMovies = (callback, query) => {
        dispatch({
            type: 'SET_LOADING',
            loading: true,
        });
        callback(query).then(({ results }) =>
            dispatch({
                type: 'SET_MOVIES',
                movies: results,
                tabName: query
                    ? TABS.RESULTS
                    : TABS.POPULAR,
            })
        );
    };

    useEffect(() => {
        if (debounced) {
            getMovies(getMoviesByName, debounced);
        } else {
            getMovies(getMoviesPopular);
        }
    }, [debounced]);

    return (
        <Container>
            <StyledSearch
                placeholder="input search text"
                size="large"
                onChange={onChange}
                loading={state.oading}
            />
            <Tabs defaultActiveKey="1">
                <TabPane tab={state.tabName} key="1">
                    <MoviesList movies={state.movies} />
                </TabPane>
                <TabPane tab={TABS.FAVOURITES} key="2">
                    {/* <MoviesList movies={favourites} /> */}
                </TabPane>
                <TabPane tab={TABS.LATER} key="3">
                    {/* <MoviesList movies={watchLater} /> */}
                </TabPane>
            </Tabs>
        </Container>
    );
};

const Container = styled.div`
    width: 60%;
    height: 100%;
    background-color: #fff;
    margin: 50px auto;
    border-radius: 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
`;

const StyledSearch = styled(Search)`
    margin-bottom: 20px;
`;

export default App;
