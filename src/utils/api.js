const URL = 'https://api.themoviedb.org/3/movie/popular?api_key=a5be41cb9776230a9edbf288fc44483d';

export const getMovies = async () => {
    let result;

    try {
        const response = await fetch(URL);
        result = await response.json();
    } catch (err) {
        console.error(err);
        result = null;
    }

    return result;
};
