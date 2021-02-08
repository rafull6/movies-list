import { Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import { LIST } from '../../utils/constants';
import {
    addStorage,
    getImage,
    getStorage,
    removeStorage,
} from '../../utils/helpers';
import { Container, Details, Image, SwitchContainer } from './styles';

const Movie = ({ movie, updateStateList }) => {
    const { poster_path, original_title, overview } = movie;

    const [lists, setLists] = useState({
        watchLater: false,
        favourite: false,
    });

    const onChangeWatchLater = () => {
        updateList(LIST.WATCH_LATER, movie);
        checkLists();
    };

    const onChangeFavourites = () => {
        updateList(LIST.FAVOURITES, movie);
        checkLists();
    };

    const checkLists = () => {
        setLists({
            watchLater: checkList(LIST.WATCH_LATER, movie),
            favourite: checkList(LIST.FAVOURITES, movie),
        });
    };

    const updateList = (listName, movie) => {
        let updatedList;
        const hasMovie = checkList(listName, movie);
        const savedList = getStorage(listName);

        if (hasMovie) {
            removeStorage(listName, movie);
            updatedList = savedList.filter((el) => el.id !== movie.id);
        } else {
            addStorage(listName, movie);
            updatedList = [...savedList, movie];
        }

        updateStateList(listName, updatedList);
    };

    useEffect(() => {
        checkLists();
    }, []);

    return (
        <Container>
            <Image src={getImage(poster_path)} alt={original_title} />
            <Details>
                <h1>{original_title}</h1>
                <p>{overview}</p>
                <SwitchContainer>
                    <span>Favourites:</span>
                    <Switch
                        checked={lists.favourite}
                        onChange={onChangeFavourites}
                    />
                </SwitchContainer>
                <SwitchContainer>
                    <span>Watch later:</span>
                    <Switch
                        checked={lists.watchLater}
                        onChange={onChangeWatchLater}
                    />
                </SwitchContainer>
            </Details>
        </Container>
    );
};

const checkList = (name, movie) =>
    getStorage(name).filter((el) => el.id === movie.id).length > 0;

export default Movie;
