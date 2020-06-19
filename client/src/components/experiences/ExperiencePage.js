import React from 'react';
import SampleImg from '../../img/experience-sample.jpg';
import Portrait from '../../img/portrait.jpg';

function ExperiencePage() {
  return (
    <div className='experience-wrapper'>
      <img className='profile-bg-img' src={SampleImg} alt='' />
      <img className='experience-avatar' src={Portrait} alt='' />
      <div className='container'>
        <h1 className='text-center mb-0 mt-3'>Hiking</h1>
        <h3 className='text-center border-bottom mb-0'>
          With <span className='primary-color'>Tom Brady</span>
        </h3>
        <h3 className=' border-bottom pt-4 pb-4'>
          What we are going<span className='text-secondary'> to do...</span>
          <br></br>
          <p className='text-small mt-2'>
            We are going to go hiking and youre all going to love it or else
          </p>
        </h3>
        <div className='pt-4'>Languages</div>
        <div className=''>Group Size</div>
        <div className=''>$ Cost</div>
        <div className=''>Phone Number</div>
        <div className=''>Street</div>
        <div className=''>City</div>
        <div className=''>State</div>
        <div className=''>Zip</div>
        <div className=''>Start Time:</div>
        <div className='border-bottom pb-4'>Duration</div>
        <h3 className='border-bottom pt-4 pb-4'>Included:</h3>
        <h3 className='border-bottom pt-4 pb-4'>Recommended:</h3>

        <h3 className='mt-4'>Reviews:</h3>
      </div>
    </div>
  );
}

export default ExperiencePage;
