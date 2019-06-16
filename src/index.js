import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login'
import * as serviceWorker from './serviceWorker';
import { Router, Route } from 'react-router-dom';
import history from './components/history';
import CandidateScreen from './components/CandidateScreen'

ReactDOM.render( <Router history={history}>
  <div>
    <Route exact={true} path="/" component={Login} />
    <Route path="/dashboard/:id?" component={CandidateScreen} />
  </div>
</Router>, document.getElementById('root'));

serviceWorker.unregister();
