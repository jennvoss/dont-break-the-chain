import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route, Router, Switch } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./Login";
import App from "./App";
import InvalidRoute from './invalid-route';
import './index.css';

const customHistory = createBrowserHistory();
const Root = () => (
  <Router history={customHistory}>
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={App} />
        <Route component={InvalidRoute} />
      </Switch>
    </div>
  </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();