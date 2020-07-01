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

  let {first_name} = userData;

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

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  if (phone_number) phone_number = formatPhoneNumber(phone_number);

  return (
    <div className='experience-wrapper'>
      <img className='profile-bg-img' src={StockCoverPhoto} alt='' />
      <img className='experience-avatar' src={PortraitPlaceholder} alt='' />
      <div className='container'>
        <h1 className='text-center mb-0 mt-3'>{title}</h1>
        <h3 className='text-center border-bottom mb-0'>
          <span className='primary-color text-bold name-font'>
            With {first_name}
          </span>
        </h3>
        <h3 className=' border-bottom pt-4 pb-4'>
          What we are going<span className='text-secondary'> to do...</span>
          <br></br>
          <p className='text-small mt-2'>{description}</p>
        </h3>

        <div className='container border-bottom pt-4 pb-4'>
          <div className='row'>
            <div className='col-sm-4 '>
              <i className='fas fa-globe'></i> {languages}
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-users'></i> Groups up to {group_size}
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-dollar-sign'></i> {cost}
            </div>

            <div className='col-sm-4'>
              <i className='far fa-clock'></i> Start Time {start}
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-hourglass-half'></i> {duration} hours
            </div>
            <div className='col-sm-4'>
              <i className='fas fa-phone'></i> {phone_number}
            </div>
          </div>
        </div>

        <div className='border-bottom pb-4'>
          <h3 className='pt-4 pb-2'>
            Good <span className='text-secondary'> to know...</span>
          </h3>
          <p className='text-small'>
            <i className='fas fa-map-marker-alt'></i>{' '}
            <strong>Meeting Point</strong>
          </p>{' '}
          <div className='text-small mt-2'>
            {street} <br></br>
            {city}, {state} {zip_code}{' '}
          </div>
        </div>

        <h3 className='border-bottom pt-4 pb-4'>
          What's included in{' '}
          <span className='text-secondary'> this experience...</span>
          <p className='text-small mt-2'>{included}</p>{' '}
        </h3>

        <h3 className='border-bottom pt-4 pb-4'>
          What is recommended{' '}
          <span className='text-secondary'> to bring...</span> {recommended}
        </h3>

        <h3 className='mt-4'>Reviews:</h3>
      </div>
    </div>
  );
}

export default ExperiencePage;
