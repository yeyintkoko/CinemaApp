const { SHOW_LOADING, HIDE_LOADING } = require('../../constants');

export function showLoading(status) {
    return {
        type: SHOW_LOADING,
        payload: {
            status,
        },
    };
}

export function hideLoading() {
    return {
        type: HIDE_LOADING,
    };
}
