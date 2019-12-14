import { combineReducers } from 'redux';
import auth from './auth';
import movies from './movie';
import loading from './loading';
import alert from './alert';
import search from './search';

const rootReducer = combineReducers({
    auth,
    movies,
    loading,
    alert,
    search,
});

export default rootReducer;
