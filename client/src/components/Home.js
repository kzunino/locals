import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import NavBar from './NavBar';
import SecondaryNav from './SecondaryNav';

import Featured from '../components/Featured';

const Home = () => {
  return (
    <Fragment>
      <Jumbotron fluid className='jumbotron pt-0 pb-sm-1 md-pb-5 mb-0'>
        <NavBar />
        <div className='container'>
          <h1 className='text-center text-white '>
            Explore New Places With{' '}
            <span className='primary-color'>Locals</span>
          </h1>
        </div>
      </Jumbotron>
      <SecondaryNav />
      <Switch>
        <Route path='/home' component={Featured} />
      </Switch>
    </Fragment>
  );
};

export default Home;
