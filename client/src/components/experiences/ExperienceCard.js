import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import SampleImg from '../../img/experience-sample.jpg';
import Portrait from '../../img/portrait.jpg';

function ExperienceCard({
  experienceData: {
    user: {first_name, avatar},
  },
  experienceData: {
    cover_photo,
    activity_type,
    title,
    cost,
    duration,
    adventure_uid,
  },
  context,
  context: {user_uid},
  history,
}) {
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [isExpSaved, setIsExpSavedData] = useState(null);

  useEffect(() => {
    //gets all the saved experiences
    if (user_uid) {
      const getSavedExperiencesByUserUid = async () => {
        const res = await context.actions.get_saved_experiences();
        console.log(res);
        setSavedExperiences([...res.favorites]);
        isExperienceSaved(res.favorites);
      };

      //checks to see if post is already liked and renders them liked
      const isExperienceSaved = (savedExperiences) => {
        if (savedExperiences) {
          for (let experience of savedExperiences) {
            if (experience.fk_user_uid === user_uid) {
              setIsExpSavedData('saved');
            }
          }
        }
      };

      getSavedExperiencesByUserUid();
    }
  }, [context.actions, user_uid]);

  //saves experience or destroys experience depending if exists and then toggles heart color
  const saveExp = async (adventure_uid) => {
    const res = await context.actions.save_experience(adventure_uid);
    console.log(res);
    if (res === 202) setIsExpSavedData(null);
    else setIsExpSavedData('saved');
  };

  return (
    <Card className='experience-card bg-color'>
      {user_uid ? (
        <button
          type='submit'
          className={`heart-btn heart ${isExpSaved}`}
          onClick={() => saveExp(adventure_uid)}
        >
          {isExpSaved ? (
            <i className='fas fa-heart fa-lg'></i>
          ) : (
            <i className='far fa-heart fa-lg'></i>
          )}
        </button>
      ) : (
        <a role='button' href='/login' className={`heart-btn heart a-heart`}>
          <i className='far fa-heart fa-lg'></i>
        </a>
      )}

      <Link
        to={`/experience/${adventure_uid}`}
        style={{color: 'inherit', textDecoration: 'inherit'}}
      >
        <Card.Img
          variant='top'
          src={cover_photo || SampleImg}
          className='relative'
        />
        <img
          src={avatar || Portrait}
          alt=''
          className='experience-user-avatar'
        />

        <Card.Body className='pt-0 pb-0'>
          <p className='experience-subheading'>
            Enjoy {activity_type} with{' '}
            <span className='primary-color'>{first_name}</span>
          </p>
          <Card.Title className='card-title'>{title}</Card.Title>
          <p className='card-details'>
            ${cost} &#8226; {duration} Hours &#8226; {activity_type}
          </p>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ExperienceCard;
