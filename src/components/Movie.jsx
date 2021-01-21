import styled from 'styled-components';
import { getImage } from '../utils/helpers';

const Movie = ({ movie: { poster_path, original_title, overview } }) => (
    <Container>
        <Image src={getImage(poster_path)} alt={original_title} />
        <Details>
            <h1>{original_title}</h1>
            <p>{overview}</p>
        </Details>
    </Container>
);

const Container = styled.div`
    display: flex;
    width: 50%;
    margin-bottom: 40px;
`;

const Image = styled.img`
    height: 40vh;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
`;

const Details = styled.div`
    padding: 0 40px 0 20px;

    h1 {
        font-size: 1.4rem;
        font-weight: bold;
    }

    p {
        height: 35vh;
        overflow: hidden;
        position: relative;
        margin: 0;

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 30%;
            background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 1) 65%);
            position: absolute;
            bottom: 0;
        }
    }
`;

export default Movie;
