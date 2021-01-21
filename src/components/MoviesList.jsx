import React from 'react';
import styled from 'styled-components';
import Movie from './Movie';

const MoviesList = ({ movies }) => (
    <Container>
        {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
        ))}
    </Container>
);

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px 30px;
`;

export default MoviesList;
