import React, { useEffect, useReducer } from 'react';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';
import MoviesList from './components/MoviesList';
import { getMoviesByName, getMoviesPopular } from './utils/api';
import { device, LIST, TABS } from './utils/constants';
import useDebounce from './hooks/use-debounce';
import { appReducer, initialState } from './reducers/app-reducer';
import { getStorage } from './utils/helpers';
import {
    SET_LOADING,
    SET_MOVIES,
    SET_SEARCH_VALUE,
    UPDATE_STATE_LIST,
} from './reducers/action-types';

const { TabPane } = Tabs;
const { Search } = Input;

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const debounced = useDebounce(state.searchValue, 500);

    const onChange = (e) => {
        dispatch({
            type: SET_SEARCH_VALUE,
            value: e.target.value,
        });
    };

    const getMovies = (callback, query) => {
        dispatch({
            type: SET_LOADING,
            loading: true,
        });
        callback(query).then(({ results }) => {
            dispatch({
                type: SET_MOVIES,
                movies: results,
                tabName: query ? TABS.RESULTS : TABS.POPULAR,
            });
            dispatch({
                type: SET_LOADING,
                loading: false,
            });
        });
    };

    const updateStateList = (listName, updatedList) => {
        dispatch({
            type: UPDATE_STATE_LIST,
            listName,
            updatedList,
        });
    };

    useEffect(() => {
        if (debounced) {
            getMovies(getMoviesByName, debounced);
        } else {
            getMovies(getMoviesPopular);
        }
    }, [debounced]);

    useEffect(() => {
        updateStateList(LIST.WATCH_LATER, getStorage(LIST.WATCH_LATER));
        updateStateList(LIST.FAVOURITES, getStorage(LIST.FAVOURITES));
    }, []);

    return (
        <Container>
            <StyledSearch
                placeholder="input search text"
                size="large"
                onChange={onChange}
                loading={state.loading}
                allowClear
            />
            <Tabs defaultActiveKey="1">
                <TabPane tab={state.tabName} key="1">
                    <MoviesList
                        movies={state.movies}
                        updateStateList={updateStateList}
                    />
                </TabPane>
                <TabPane tab={TABS.FAVOURITES} key="2">
                    <MoviesList
                        movies={state.favourites}
                        updateStateList={updateStateList}
                    />
                </TabPane>
                <TabPane tab={TABS.LATER} key="3">
                    <MoviesList
                        movies={state.watchLater}
                        updateStateList={updateStateList}
                    />
                </TabPane>
            </Tabs>
        </Container>
    );
};

const Container = styled.div`
    width: 95%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    margin: 10px auto;

    @media ${device.laptop} {
        width: 85%;
    }

    @media ${device.laptopL} {
        margin: 50px auto;
        width: 65%;
    }
`;

const StyledSearch = styled(Search)`
    margin-bottom: 20px;
`;

export default App;
