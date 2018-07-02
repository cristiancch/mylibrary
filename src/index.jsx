import "babel-polyfill";
import React from 'react';
import {render} from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import configureStore from "./ducks/store/configureStore";
import {getBooksFromDB} from "./ducks/actions/booksActions";
import {Provider} from 'react-redux';

const store = configureStore();
store.dispatch(getBooksFromDB());

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
