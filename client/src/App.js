import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import setAuthToken from './utilites/setAuthToken';

// import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import NavBar from './components/NavBar';
import Home from './components/Home';
import Featured from './components/Featured';
import ExperienceDashBoard from './components/experiences/ExperienceDashboard';
import Experiences from './components/experiences/Experiences';
import ExperiencePage from './components/experiences/ExperiencePage';
import CreateExperience from './components/experiences/CreateExperience';
import EditExperience from './components/experiences/EditExperience';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

import Post from './components/posts/Post';

import Profile from './components/profile/Profile';
import MyProfile from './components/profile/MyProfile';

import ProfileEdit from './components/profile/ProfileEdit';

import Footer from './components/Footer';
import MessageBoard from './components/MessageBoard';

//Components with context
const HomeWithContext = withContext(Home);
const NavBarWithContext = withContext(NavBar);
const FeaturedWithContext = withContext(Featured);
const ExperiencesWithContext = withContext(Experiences);
const ExperiencePageWithContext = withContext(ExperiencePage);
const PostWithContext = withContext(Post);
const ExperienceDashBoardWithContext = withContext(ExperienceDashBoard);
const CreateExperienceWithContext = withContext(CreateExperience);
const EditExperienceWithContext = withContext(EditExperience);
const ProfileWithContext = withContext(Profile);
const MyProfileWithContext = withContext(MyProfile);
const ProfileEditWithContext = withContext(ProfileEdit);
const MessageBoardWithContext = withContext(MessageBoard);
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
      {/* checks path to render nav & footer */}
      {location.pathname.includes('/home') ? (
        <Route component={HomeWithContext} />
      ) : null}
      <Switch>
        <Route exact path='/home' component={FeaturedWithContext} />
        <Route path='/home/experiences' component={ExperiencesWithContext} />
        <Route path='/home/messageboard' component={MessageBoardWithContext} />
        <PrivateRoute path='/post/:post_uid' component={PostWithContext} />

        <PrivateRoute path='/profile/me' component={MyProfileWithContext} />

        <PrivateRoute
          path='/profile/:user_uid'
          component={ProfileWithContext}
        />
        <Route path='/edit/profile' component={ProfileEditWithContext} />

        <Route path='/dashboard' component={ExperienceDashBoardWithContext} />
        <Route path='/experience/:uid' component={ExperiencePageWithContext} />
        <Route
          path='/create/experience'
          component={CreateExperienceWithContext}
        />
        <Route
          path='/edit/experience/:uid'
          component={EditExperienceWithContext}
        />

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
