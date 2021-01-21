import { Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    addStorage,
    getImage,
    getStorage,
    removeStorage,
} from '../utils/helpers';

const Movie = ({
    movie: { poster_path, original_title, overview, id },
}) => {
    const [watchLater, setWatchLater] = useState(false);
    const [favourite, setFavourite] = useState(false);

    // const checkStorage = useCallback(() => {
    //     setCheckedFav(favs.includes(id));
    //     setCheckedLater(later.includes(id));
    // }, [id]);

    const onChangeWatchLater = (checked) => {
        updateList('wl', id, checked);
    };

    useEffect(() => {
        setFavourite(checkList('fv', id));
        setWatchLater(checkList('wl', id));
    }, []);

    return (
        <Container>
            <Image
                src={getImage(poster_path)}
                alt={original_title}
            />
            <Details>
                <h1>{original_title}</h1>
                <p>{overview}</p>
                <SwitchContainer>
                    <span>Favourites:</span>
                    <Switch
                        checked={favourite}
                        onChange={updateList('fv', id)}
                    />
                </SwitchContainer>
                <SwitchContainer>
                    <span>Watch later:</span>
                    <Switch
                        checked={watchLater}
                        onChange={onChangeWatchLater}
                    />
                </SwitchContainer>
            </Details>
        </Container>
    );
};

const updateList = (name, id, checked) => () => {
    if (checked) {
        addStorage(name, id);
    } else {
        removeStorage(name, id);
    }
};

const checkList = (name, id) => {
    return getStorage(name).includes(id);
};

const Container = styled.div`
    display: flex;
    width: 50%;
    margin-bottom: 40px;
`;

const SwitchContainer = styled.div`
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Image = styled.img`
    height: 40vh;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
`;

const Details = styled.div`
    padding: 0 40px 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1 {
        font-size: 1.4rem;
        font-weight: bold;
    }

    p {
        height: 25vh;
        overflow: hidden;
        position: relative;
        margin: 0;

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 40%;
            background-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 10%,
                rgba(255, 255, 255, 1) 85%
            );
            position: absolute;
            bottom: 0;
        }
    }
`;

export default Movie;
