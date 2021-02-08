export const getImage = (link, size = 'w500') =>
    `https://image.tmdb.org/t/p/${size}${link}`;

export const addStorage = (key, obj) => {
    let storageElement = JSON.parse(localStorage.getItem(key)) || [];

    if (!storageElement.filter((el) => el.id === obj.id).length) {
        storageElement.push(obj);
    }
    localStorage.setItem(key, JSON.stringify(storageElement));
};

export const removeStorage = (key, obj) => {
    const storageElement = JSON.parse(localStorage.getItem(key)) || [];

    if (storageElement.filter((el) => el.id === obj.id).length) {
        const withoutElement = storageElement.filter((el) => el.id !== obj.id);
        localStorage.setItem(key, JSON.stringify(withoutElement));
    }
};

export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
