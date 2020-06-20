import React from 'react';
import SampleImg from '../../img/experience-sample.jpg';
import Portrait from '../../img/portrait.jpg';

function Profile() {
  return (
    <div className='profile-wrapper'>
      <img className='profile-bg-img' src={SampleImg} alt='' />
      <img className='profile-picture' src={Portrait} alt='' />
      <div className='container'>
        <h1 className='text-center border-bottom mb-0'>Tom Brady</h1>
        <h6 className='text-center border-bottom text-secondary pt-4 pb-4'>
          This is my biography. I am so cool I love it
        </h6>
        <div class='container border-bottom pt-4 pb-4'>
          <div class='row'>
            <div class='col-sm-4 mb-4'>Gender</div>
            <div class='col-sm-4'>Age</div>
            <div class='col-sm-4'>Country</div>
            <div class='col-sm-4'>Languages</div>
            <div class='col-sm-4'>Phone Number</div>
          </div>
        </div>
        <h4 className='mt-4'>Reviews:</h4>
      </div>
    </div>
  );
}

export default Profile;
