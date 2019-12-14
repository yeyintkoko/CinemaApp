const { SHOW_SEARCH, HIDE_SEARCH } = require('../../constants');

export function showSearch(status) {
    return {
        type: SHOW_SEARCH,
    };
}

export function hideSearch() {
    return {
        type: HIDE_SEARCH,
    };
}
