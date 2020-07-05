import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
//import SampleImg from '../../img/experience-sample.jpg';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
import Moment from 'react-moment';

function Profile({context, match, context: {user_uid}}) {
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState({});

  let {
    cover_photo,
    bio,
    gender,
    languages,
    date_of_birth,
    country,
    phone_number,
  } = profileData;

  let {first_name, last_name, avatar, verified} = userData;

  useEffect(() => {
    const getProfile = async () => {
      let res = await context.actions.get_profile_by_uid(match.params.user_uid);
      console.log(res);
      // if (res === 400) {
      //   res = await context.actions.create_profile();//
      //   console.log(res);
      //   setProfileData({...res.profile});
      //   setUserData({...res.profile.user});
      // }
      setProfileData({...res});
      setUserData({...res.user});
    };

    getProfile();
  }, [context.actions, match.params.user_uid]);

  //redirects if user clicks on own page
  if (user_uid === match.params.user_uid) return <Redirect to='/profile/me' />;

  return (
    <div className='profile-wrapper'>
      {cover_photo ? (
        <img className='profile-bg-img' src={cover_photo} alt='' />
      ) : (
        <img className='profile-bg-img' src={StockCoverPhoto} alt='' />
      )}
      {avatar ? (
        <img className='profile-picture' src={avatar} alt='' />
      ) : (
        <img className='profile-picture' src={PortraitPlaceholder} alt='' />
      )}

      <div className='container'>
        <h1 className='text-center border-bottom   mb-0'>
          {first_name} {last_name}{' '}
          {verified ? (
            <i className='fas fa-user-check  fa-xs verified'></i>
          ) : null}
        </h1>
        <h6 className='text-center border-bottom text-secondary pt-4 pb-4'>
          {bio}{' '}
        </h6>
        <div className='container border-bottom pt-4 pb-4'>
          <div className='row'>
            <div className='col-sm-4'>
              <i className='far fa-calendar-alt'></i> Age:{' '}
              {date_of_birth ? (
                <Moment diff={date_of_birth} unit='years'></Moment>
              ) : null}
            </div>
            <div className='col-sm-4 '>
              <i className='far fa-user'></i> {gender}
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-globe-americas'></i> {country}
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-globe'></i> {languages}
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-phone'></i> {phone_number}
            </div>
          </div>
        </div>

        <h4 className='mt-4'>Reviews:</h4>
      </div>
    </div>
  );
}

export default Profile;
