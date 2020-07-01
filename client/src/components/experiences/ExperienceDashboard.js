import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Slider from '../Slider';

function ExperienceDashboard({context: {verified}}) {
  verified = JSON.parse(verified);

  return (
    <Fragment>
      {!verified ? (
        <div className='m-3'>
          <h3>Hosting an experience</h3>
          <p>
            If you think you'd like to host an experience, please verify your
            profile under{' '}
            <Link
              to='/profile/me'
              className='primary-color'
              style={{textDecoration: 'none'}}
            >
              My Profile
            </Link>
          </p>
        </div>
      ) : (
        <div className='m-3'>
          <h3>Hosting an experience</h3>
          <p>
            <Link
              to='/create/experience'
              className='primary-color'
              style={{textDecoration: 'none'}}
            >
              Create experience
            </Link>
          </p>
        </div>
      )}

      <h3 className='mt-4 pl-3'>Saved Experiences</h3>
      <Slider />

      {verified ? (
        <Fragment>
          (<h3 className='mt-4 pl-3'>Hosted Experiences</h3>
          <Slider />){' '}
        </Fragment>
      ) : null}
    </Fragment>
  );
}

export default ExperienceDashboard;
