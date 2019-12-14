import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { requestMovies } from '../apis/movie';
const { MOVIES_FETCH_SUCCEEDED, MOVIES_FETCH_FAILED, MOVIES_FETCH_REQUESTED } = require('../constants');

function* fetchMovies(action) {
    try {
        const movies = yield call(requestMovies, action.payload);
        yield put({ type: MOVIES_FETCH_SUCCEEDED, payload: { [action.payload.property]: movies } });
    } catch (e) {
        yield put({ type: MOVIES_FETCH_FAILED, payload: { message: e.message } });
    }
}

function* getMovies() {
    yield takeEvery(MOVIES_FETCH_REQUESTED, fetchMovies);
}

export default function* rootSaga() {
    yield all([getMovies()]);
}
