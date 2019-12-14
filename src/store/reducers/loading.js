const {
    MOVIES_FETCH_SUCCEEDED,
    MOVIES_FETCH_FAILED,
    MOVIES_FETCH_REQUESTED,
    SHOW_LOADING,
    HIDE_LOADING,
} = require('../../constants');

const initialState = {
    show: false,
    status: '',
};

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export default createReducer(initialState, {
    [MOVIES_FETCH_SUCCEEDED]: (state, payload) => {
        return { show: false, status: '' };
    },
    [MOVIES_FETCH_FAILED]: (state, payload) => {
        return { show: false, status: '' };
    },
    [HIDE_LOADING]: (state) => {
        return { show: false, status: '' };
    },
    [MOVIES_FETCH_REQUESTED]: (state, payload) => {
        return { show: true, status: 'Getting movie list...' };
    },
    [SHOW_LOADING]: (state, payload) => {
        return { show: true, status: payload.status };
    },
});
