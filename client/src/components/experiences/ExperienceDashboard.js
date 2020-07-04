import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Slider from '../Slider';

function ExperienceDashboard({context, context: {verified}}) {
  verified = JSON.parse(verified);
  const [userExperiences, setUserExperiences] = useState([]);

  useEffect(() => {
    const getUserExperiences = async () => {
      let res = await context.actions.get_user_experiences();
      console.log(res);
      setUserExperiences(res.adventures);
    };

    getUserExperiences();
  }, [context.actions]);

  console.log(userExperiences);
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
            {' '}
            Do you have ideas on how to be a local host in your area? Well, look
            no further! Follow the link to craft your own unique experience for
            people visiting your neck of the woods.{' '}
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
          <h3 className='mt-4 pl-3'>Hosted Experiences</h3>
          <Slider experiences={userExperiences} />){' '}
        </Fragment>
      ) : null}
    </Fragment>
  );
}

export default ExperienceDashboard;
