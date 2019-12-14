const { AUTH_USER_LOGIN_SUCCESS } = require('../../constants');

export function saveUser(data) {
    return {
        type: AUTH_USER_LOGIN_SUCCESS,
        payload: {
            ...data,
        },
    };
}
