import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import { Login } from './pages/login/Login';
import Store from './service/context/Context'
import { SignUp } from './pages/login/SignUp';

import 'aos/dist/aos.css';

ReactDOM.render(
  <React.StrictMode>
    <Store>
    <Router>
      <Switch>
          <Route exact path="/login" component={Login} />
          {/* <Route path="/signup" component={SignUp} /> */}
        <App />
      </Switch>
    </Router>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

