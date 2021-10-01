import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
import {Router} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {render} from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import {initFacebookSdk} from './services/initFacebookSdk';
import store from './store';

const history = createBrowserHistory();

initFacebookSdk().then(startApp);

function startApp() {
  render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Router history={history}>
                    <App />
                </Router>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
