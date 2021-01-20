import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import MoviesList from './components/MoviesList';
import { getMovies } from './utils/api';

const { Search } = Input;

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then((res) => setMovies(res.results));
    }, []);

    return (
        <Container>
            <Search placeholder="input search text" enterButton="Search" size="large" />
            <MoviesList movies={movies} />
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

export default App;
