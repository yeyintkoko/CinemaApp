const { MOVIES_FETCH_FAILED, HIDE_ALERT } = require('../../constants');

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
    [MOVIES_FETCH_FAILED]: (state, payload) => {
        return { show: true, status: payload.message };
    },
    [HIDE_ALERT]: (state, payload) => {
        return { show: false, status: '' };
    },
});
