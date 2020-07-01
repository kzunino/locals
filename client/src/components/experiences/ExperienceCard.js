import React from 'react';
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
}) {
  return (
    <Link
      to={`/experience/${adventure_uid}`}
      style={{color: 'inherit', textDecoration: 'inherit'}}
    >
      <Card className='experience-card bg-color'>
        <Card.Img variant='top' src={cover_photo || SampleImg} />
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
          <p>
            ${cost} &#8226; {duration} &#8226; {activity_type}
          </p>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ExperienceCard;
