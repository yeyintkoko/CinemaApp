const { MOVIES_FETCH_SUCCEEDED } = require('../../constants');

const initialState = {
    popular: null,
    latest: null,
    search: null,
};

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export default createReducer(initialState, {
    [MOVIES_FETCH_SUCCEEDED]: (state, payload) => {
        return Object.assign({}, state, {
            ...payload,
        });
    },
});
