import React, {Fragment} from 'react';
//import withContext from '../Context';

import Jumbotron from 'react-bootstrap/Jumbotron';
//import NavBar from './NavBar';
import SecondaryNav from './SecondaryNav';

//const NavBarWithContext = withContext(NavBar);

const Home = () => {
  return (
    <Fragment>
      <Jumbotron fluid className='jumbotron pt-0 pb-sm-1 md-pb-5 mb-0'>
        {/* <NavBarWithContext /> */}
        <div className='container'>
          <h1 className='text-center text-white '>
            Explore New Places With{' '}
            <span className='primary-color'>Locals</span>
          </h1>
        </div>
      </Jumbotron>
      <SecondaryNav />
    </Fragment>
  );
};

export default Home;
