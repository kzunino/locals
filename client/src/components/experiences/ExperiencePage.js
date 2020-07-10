import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
import Review from './Review';

function ExperiencePage({context, context: {user_uid}, match}) {
  const [experienceData, setExperienceData] = useState({});
  const [userData, setUserData] = useState({});
  const [reviews, setReviews] = useState([]);

  let {
    title,
    adventure_uid,
    description,
    // activity_type,
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
    fk_user_uid,
  } = experienceData;

  let {first_name, avatar} = userData;

  useState(() => {
    const getExperience = async () => {
      let res = await context.actions.get_exp_by_uid(match.params.uid);
      if (res) {
        console.log(res);
        setExperienceData({...res.adventure});
        setUserData({...res.adventure.user});
      } else {
        //create a not found route
      }
    };

    const getReviews = async () => {
      let res = await context.actions.get_experience_reviews(match.params.uid);
      if (res) {
        console.log(res);
        setReviews([...res]);
      }
    };

    getExperience();
    getReviews();
  }, [match.params.id]);

  //formats the phone number on the profile page
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  if (phone_number) phone_number = formatPhoneNumber(phone_number);

  //checks to see if current user matches fk_user_uid and if so shows edit button
  let userExperience = false;
  if (user_uid === fk_user_uid) userExperience = true;

  return (
    <div className='experience-wrapper'>
      <img
        className='profile-bg-img'
        src={cover_photo || StockCoverPhoto}
        alt=''
      />
      <img
        className='experience-avatar'
        src={avatar || PortraitPlaceholder}
        alt=''
      />
      <div className='container'>
        <h1 className='text-center mb-0 mt-3'>{title}</h1>
        <h3 className='text-center border-bottom mb-0'>
          <span className='primary-color text-bold name-font'>
            With {first_name}
          </span>
          <Link
            to={`/edit/experience/${adventure_uid}`}
            style={{textDecoration: 'none'}}
          >
            {userExperience ? (
              <span className='text-small text-muted'> edit</span>
            ) : null}
          </Link>
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

        {included ? (
          <h3 className='border-bottom pt-4 pb-4'>
            What's included in{' '}
            <span className='text-secondary'> this experience...</span>
            <p className='text-small mt-2'>{included}</p>{' '}
          </h3>
        ) : null}

        {recommended ? (
          <h3 className='border-bottom pt-4 pb-4'>
            What is recommended{' '}
            <span className='text-secondary'> to bring...</span>{' '}
            <p className='text-small mt-2'>{recommended}</p>{' '}
          </h3>
        ) : null}

        <h3 className='mt-4'>Reviews:</h3>

        {/* review component */}
        {reviews.length
          ? reviews.map((review) => {
              return <Review reviewData={review} key={review.review_uid} />;
            })
          : null}
      </div>
    </div>
  );
}

export default ExperiencePage;
