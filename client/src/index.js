import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/normalize.css';
import './styles/post.css';
import './styles/slider.css';
import './styles/index.css';
import './styles/profile.css';
import './styles/experiencePage.css';

import App from './App';
import {Provider} from './Context';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
