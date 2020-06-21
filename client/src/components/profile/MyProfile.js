import React, {useState, useEffect} from 'react';
import SampleImg from '../../img/experience-sample.jpg';
import Portrait from '../../img/portrait.jpg';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
function Profile({context}) {
  const [profileData, setProfileData] = useState({
    coverPhoto: null,
    first_name: '',
    last_name: '',
    avatar: '',
    bio: '',
    gender: '',
    age: '',
    country: '',
    phone_number: '',
  });

  let {
    coverPhoto,
    first_name,
    last_name,
    avatar,
    bio,
    gender,
    age,
    country,
    phone_number,
  } = profileData;

  const getProfile = async () => {
    let res = await context.actions.get_my_profile();
    if (res === 400) res = await context.actions.create_profile();
    console.log(res.profile);
  };
  useEffect(() => {
    getProfile();

    //setProfileData(profileData, ...res.data.profile);
  }, []);

  //res.data.profile;

  return (
    <div className='profile-wrapper'>
      {coverPhoto ? (
        <img className='profile-bg-img' src={SampleImg} alt='' />
      ) : (
        <img className='profile-bg-img' src={StockCoverPhoto} alt='' />
      )}
      {avatar ? (
        <img className='profile-picture' src={Portrait} alt='' />
      ) : (
        <img className='profile-picture' src={PortraitPlaceholder} alt='' />
      )}

      <div className='container'>
        <h1 className='text-center border-bottom   mb-0'>
          Tom Brady<span className='text-secondary text-small'> Edit</span>
        </h1>
        <h6 className='text-center border-bottom text-secondary pt-4 pb-4'>
          This is my biography. I am so cool I love it
        </h6>
        <div className='container border-bottom pt-4 pb-4'>
          <div className='row'>
            <div className='col-sm-4 '>Gender</div>
            <div className='col-sm-4'>Age</div>
            <div className='col-sm-4'>Country</div>
            <div className='col-sm-4'>Languages</div>
            <div className='col-sm-4'>Phone Number</div>
          </div>
        </div>
        <h4 className='mt-4'>Reviews:</h4>
      </div>
    </div>
  );
}

export default Profile;
