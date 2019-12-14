const { MOVIES_FETCH_REQUESTED } = require('../../constants');

export function fetchMovies(data) {
    return {
        type: MOVIES_FETCH_REQUESTED,
        payload: {
            ...data,
        },
    };
}
