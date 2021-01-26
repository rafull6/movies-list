export const getImage = (link, size = 'w500') =>
    `https://image.tmdb.org/t/p/${size}${link}`;

export const addStorage = (key, value) => {
    let storageElement =
        JSON.parse(localStorage.getItem(key)) || [];
    if (!storageElement.includes(value)) {
        storageElement.push(value);
    }
    localStorage.setItem(
        key,
        JSON.stringify(storageElement)
    );
};

export const removeStorage = (key, value) => {
    const storageElement =
        JSON.parse(localStorage.getItem(key)) || [];

    if (storageElement.includes(value)) {
        const withoutElement = storageElement.filter(
            (el) => el !== value
        );
        localStorage.setItem(
            key,
            JSON.stringify(withoutElement)
        );
    }
};

export const getStorage = (key) =>
    JSON.parse(localStorage.getItem(key)) || [];
