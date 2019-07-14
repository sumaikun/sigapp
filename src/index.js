import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Login from './pages/Login';
import Main from './pages/Main';
import Loading from './components/Loading';
import ActivitiesCalendar from "./pages/ActivitiesCalendar";
import ErrorBoundary from "./containers/ErrorBoundary";
import Register from "./pages/Register";
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers/";

import { loadState, saveState } from './helpers/appStorage';

const loadedData = loadState();

console.log(loadedData);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

console.log(store);

store.subscribe( function () {
  //console.log("listener activated");
  //console.log(store.getState());
  saveState(store.getState())
});

ReactDOM.render(
<Provider store={store}>
  <ErrorBoundary>
    <App/>
  </ErrorBoundary>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
