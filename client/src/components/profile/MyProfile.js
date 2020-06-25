import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import SampleImg from '../../img/experience-sample.jpg';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
import Moment from 'react-moment';

function Profile({context, context: {verified}}) {
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

  let {first_name, last_name, avatar} = userData;

  useEffect(() => {
    const getProfile = async () => {
      let res = await context.actions.get_my_profile();
      console.log(res);
      if (res === 400) {
        res = await context.actions.create_profile();
        console.log(res);
        setProfileData({...res.profile});
        setUserData({...res.profile.user});
      }
      setProfileData({...res.profile});
      setUserData({...res.profile.user});
    };

    getProfile();
  }, [context]);

  return (
    <div className='profile-wrapper'>
      {cover_photo ? (
        <img className='profile-bg-img' src={SampleImg} alt='' />
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
          {verified ? <i class='fas fa-user-check  fa-xs verified'></i> : null}
          {first_name} {last_name}
          <Link to='/edit/profile' style={{textDecoration: 'none'}}>
            <span className='text-secondary text-small'> Edit Profile</span>
          </Link>
        </h1>
        <h6 className='text-center border-bottom text-secondary pt-4 pb-4'>
          {bio}{' '}
        </h6>
        <div className='container border-bottom pt-4 pb-4'>
          <div className='row'>
            <div className='col-sm-4 '>Gender {gender}</div>
            <div className='col-sm-4'>
              Age
              {date_of_birth ? (
                <Moment diff={date_of_birth} unit='years'></Moment>
              ) : null}
            </div>
            <div className='col-sm-4'>Country {country}</div>
            <div className='col-sm-4'>Languages {languages}</div>
            <div className='col-sm-4'>Phone Number {phone_number}</div>
          </div>
        </div>
        <h4 className='mt-4'>Reviews:</h4>
      </div>
    </div>
  );
}

export default Profile;
