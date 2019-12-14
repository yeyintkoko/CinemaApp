import Config from 'react-native-config';

const axios = require('axios');

axios.defaults.baseURL = `${Config.BACKEND_URL}/3`;
axios.defaults.timeout = 25000;

export function requestMovies(payload) {
    let url = '';

    if (payload.property === 'popular') {
        url = `/movie/popular?api_key=${Config.API_KEY}&language=en-US&page=${payload.page}`;
    }

    if (payload.property === 'latest') {
        url = `/movie/top_rated?api_key=${Config.API_KEY}&language=en-US&page=${payload.page}`;
    }

    if (payload.property === 'search') {
        url = `/search/movie?api_key=${Config.API_KEY}&language=en-US&query=${payload.query}&page=${payload.page}`;
    }

    return axios.get(url);
}
