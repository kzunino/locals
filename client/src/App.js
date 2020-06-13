import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import Header from './components/Header';
import Featured from './components/Featured';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />

        <Switch>
          <Route path='/' component={Featured} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
