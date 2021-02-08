import React from 'react';
import Movie from '../Movie';
import { Container } from './styles';

const MoviesList = ({ movies, updateStateList }) => (
    <Container>
        {movies.map((movie) => (
            <Movie
                key={movie.id}
                movie={movie}
                updateStateList={updateStateList}
            />
        ))}
    </Container>
);

export default MoviesList;
