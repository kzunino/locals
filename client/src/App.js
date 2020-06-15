import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import withContext from './Context';
import setAuthToken from './utilites/setAuthToken';

import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import NavBar from './components/NavBar';
import Home from './components/Home';
import LogIn from './components/LogIn';

//Components with context
const HomeWithContext = withContext(Home);
const LogInWithContext = withContext(LogIn);

function App() {
  //if token exists then sets api header with token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/home' component={HomeWithContext} />
          <Route path='/login' component={LogInWithContext} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;