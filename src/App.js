import React from 'react';
import { Provider } from 'react-redux';
import Context from './providers/context';
import store from './store';
import AppNavigation from './appNavigation';

const App = () => {
    return (
        <Provider store={store}>
            <Context>
                <AppNavigation />
            </Context>
        </Provider>
    );
};

export default App;
