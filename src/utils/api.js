const API_KEY = 'a5be41cb9776230a9edbf288fc44483d';

const getUrl = (resource, query = '') => `https://api.themoviedb.org/3${resource}?api_key=${API_KEY}${query}`;

export const getData = async (resource, query) => {
    let result;

    try {
        const url = getUrl(resource, query);
        const response = await fetch(url);
        result = await response.json();
    } catch (err) {
        console.error(err);
        result = null;
    }

    return result;
};

export const getMoviesPopular = async () => getData(`/movie/popular`);
export const getMoviesByName = async (query) => getData(`/search/movie`, `&query=${query}`);
