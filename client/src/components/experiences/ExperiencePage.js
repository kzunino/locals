import React, {useState} from 'react';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function ExperiencePage({context, match}) {
  const [experienceData, setExperienceData] = useState({});
  const [userData, setUserData] = useState({});

  let {
    title,
    description,
    activity_type,
    languages,
    group_size,
    cost,
    phone_number,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    included,
    recommended,
    cover_photo,
  } = experienceData;

  let {first_name, last_name} = userData;

  useState(() => {
    const getExperience = async () => {
      let res = await context.actions.get_exp_by_uid(match.params.id);
      if (res) {
        console.log(res);
        setExperienceData({...res.adventure});
        setUserData({...res.adventure.user});
      } else {
        //create a not found route
      }
    };

    getExperience();
  }, [match.params.id]);

  return (
    <div className='experience-wrapper'>
      <img className='profile-bg-img' src={StockCoverPhoto} alt='' />
      <img className='experience-avatar' src={PortraitPlaceholder} alt='' />
      <div className='container'>
        <h1 className='text-center mb-0 mt-3'>{title}</h1>
        <h3 className='text-center border-bottom mb-0'>
          With{' '}
          <span className='primary-color'>
            {first_name} {last_name}
          </span>
        </h3>
        <h3 className=' border-bottom pt-4 pb-4'>
          What we are going<span className='text-secondary'> to do...</span>
          <br></br>
          <p className='text-small mt-2'>{description}</p>
        </h3>
        <div className='pt-4'>Languages {languages}</div>
        <div className=''>Group Size {group_size}</div>
        <div className=''>$ {cost}</div>
        <div className=''>Phone Number {phone_number}</div>
        <div className=''>
          Address: <br></br>
          {street} <br></br>
          {city},{state} {zip_code}{' '}
        </div>

        <div className=''>Start Time: {start}</div>
        <div className='border-bottom pb-4'>Duration: {duration}</div>
        <h3 className='border-bottom pt-4 pb-4'>
          Included:
          <p className='text-small mt-2'>{included}</p>{' '}
        </h3>

        <h3 className='border-bottom pt-4 pb-4'>Recommended: {recommended}</h3>

        <h3 className='mt-4'>Reviews:</h3>
      </div>
    </div>
  );
}

export default ExperiencePage;
