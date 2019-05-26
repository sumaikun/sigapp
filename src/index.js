import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Login from './pages/Login';
import Main from './pages/Main';
import Loading from './components/Loading';
import ActivitiesCalendar from "./pages/ActivitiesCalendar";
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers/";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
