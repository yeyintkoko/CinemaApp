const { AUTH_USER_LOGIN_SUCCESS } = require('../../constants');

const initialState = null;

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export default createReducer(initialState, {
    [AUTH_USER_LOGIN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            ...payload,
        });
    },
});
