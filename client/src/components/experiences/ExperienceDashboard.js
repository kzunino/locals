import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Slider from '../Slider';
import withContext from '../../Context';
const SliderWithContext = withContext(Slider);

function ExperienceDashboard({context, context: {verified}}) {
  verified = JSON.parse(verified);
  const [userExperiences, setUserExperiences] = useState([]);
  const [savedExperiences, setSavedExperience] = useState([]);

  useEffect(() => {
    const getUserExperiences = async () => {
      let res = await context.actions.get_user_experiences();
      console.log(res);
      setUserExperiences(res.adventures);
    };

    const getSavedExperiences = async () => {
      let res = await context.actions.get_saved_experiences();
      console.log(res);
      setSavedExperience(res.favorites);
    };

    getUserExperiences();
    getSavedExperiences();
  }, [context.actions]);

  console.log(userExperiences);
  console.log(savedExperiences);

  //takes experience data from favorites query and sends it to saved component
  let experienceData = [];
  for (let favoriteExp of savedExperiences) {
    experienceData = [...experienceData, favoriteExp.adventure];
  }
  console.log(experienceData);

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

      {verified ? (
        <Fragment>
          <h3 className='mt-4 pl-3'>Hosted Experiences</h3>
          <SliderWithContext experiences={userExperiences} />{' '}
        </Fragment>
      ) : null}

      <h3 className='mt-4 pl-3'>Saved Experiences</h3>
      {savedExperiences.length ? (
        <SliderWithContext experiences={experienceData} />
      ) : (
        <div className='m-3'>
          <p>No experiences saved yet!</p>
        </div>
      )}
    </Fragment>
  );
}

export default ExperienceDashboard;
