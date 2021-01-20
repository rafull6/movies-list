import { Card } from 'antd';
import styled from 'styled-components';
import { getImage } from '../utils/helpers';

const MoviesList = ({ movies }) => {
    return (
        <Container>
            {movies.map((movie) => (
                <Movie>
                    <Image src={getImage(movie.backdrop_path)} />
                    <Details>
                        <Title>{movie.original_title}</Title>
                    </Details>
                </Movie>
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 0 20px;
`;

const Title = styled.div`
    font-size: 1.4rem;
    text-transform: uppercase;
    font-weight: bold;
`;

const Image = styled.img`
    width: 20%;
    box-shadow: 0 2px 40px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease;
    border-radius: 5px;
    will-change: box-shadow;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 20px;
`;

const Movie = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 40px;
    cursor: pointer;

    &::not(::last-child) {
        border-bottom: 1px solid #cecece;
    }
`;

export default MoviesList;
