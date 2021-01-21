import React, { useEffect, useState } from 'react';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';
import MoviesList from './components/MoviesList';
import { findMovieByName, getPopularMovies } from './utils/api';
import useDebounce from './hooks/use-debounce';

const { TabPane } = Tabs;
const { Search } = Input;

const TABS = {
    POPULAR: 'Popular movies',
    RESULTS: 'Search results',
    FAVOURITES: 'Favourites',
    LATER: 'Watch later',
};

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [tabName, setTabName] = useState('');
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const getDefaultMovies = () => {
        getPopularMovies().then(({ results }) => setMovies(results));
    };

    useEffect(() => {
        if (debounced) {
            setLoading(true);
            findMovieByName(debounced).then(({ results }) => {
                setLoading(false);
                setMovies(results);
                setTabName(TABS.RESULTS);
            });
        } else {
            getDefaultMovies();
            setTabName(TABS.POPULAR);
        }
    }, [debounced]);

    return (
        <Container>
            <StyledSearch placeholder="input search text" size="large" onChange={onChange} loading={loading} />
            <Tabs defaultActiveKey="1">
                <TabPane tab={tabName} key="1">
                    <MoviesList movies={movies} loading={loading} />
                </TabPane>
                <TabPane tab={TABS.FAVOURITES} key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab={TABS.LATER} key="3">
                    Content of Tab Pane 3
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
