import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import withContext from './Context';
import setAuthToken from './utilites/setAuthToken';

// import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import NavBar from './components/NavBar';
import Home from './components/Home';
import Featured from './components/Featured';
import Experiences from './components/experiences/Experiences';
import ExperiencePage from './components/experiences/ExperiencePage';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Post from './components/posts/Post';
import Profile from './components/Profile';

import Footer from './components/Footer';
import Classifieds from './components/Classifieds';

//Components with context
const HomeWithContext = withContext(Home);
const NavBarWithContext = withContext(NavBar);
const ExperiencesWithContext = withContext(Experiences);
const ExperiencePageWithContext = withContext(ExperiencePage);
const ClassifiedsWithContext = withContext(Classifieds);
const ProfileWithContext = withContext(Profile);
const LogInWithContext = withContext(LogIn);
const SignUpWithContext = withContext(SignUp);

function App({location}) {
  //if token exists then sets api header with token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Fragment>
      <Route component={NavBarWithContext} />
      {/* chekcs path to render nav & footer */}
      {location.pathname.includes('/home') ? (
        <Route component={HomeWithContext} />
      ) : null}
      <Switch>
        <Route exact path='/home' component={Featured} />
        <Route path='/home/experiences' component={ExperiencesWithContext} />
        <Route path='/home/classifieds' component={ClassifiedsWithContext} />
        <Route path='/post' component={Post} />
        <Route path='/profile' component={ProfileWithContext} />
        <Route path='/experience' component={ExperiencePageWithContext} />

        <Route path='/login' component={LogInWithContext} />
        <Route path='/signup' component={SignUpWithContext} />
      </Switch>
      {location.pathname.includes('/home') ? (
        <Route component={Footer} />
      ) : null}
    </Fragment>
  );
}

export default App;
