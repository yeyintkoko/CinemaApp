const { SHOW_SEARCH, HIDE_SEARCH } = require('../../constants');

const initialState = {
    show: false,
};

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export default createReducer(initialState, {
    [HIDE_SEARCH]: (state) => {
        return { show: false };
    },
    [SHOW_SEARCH]: (state) => {
        return { show: true };
    },
});
