import React from 'react';
import SampleImg from '../img/experience-sample.jpg';
import NavBar from './NavBar';
import withContext from '../Context';

const NavBarWithContext = withContext(NavBar);

function Profile() {
  return (
    <div className='container'>
      <img className='profile-bg-img pt-5' src={SampleImg} />
    </div>
  );
}

export default Profile;
