import React from 'react';
import Card from 'react-bootstrap/Card';
import SampleImg from '../img/experience-sample.jpg';
import Portrait from '../img/portrait.jpg';

function ExperienceCard() {
  return (
    <Card className='experience-card'>
      <Card.Img variant='top' src={SampleImg} />
      <img src={Portrait} alt='' className='experience-user-avatar' />
      <Card.Body className='pt-0 pb-0'>
        <p className='experience-subheading'>
          Enjoy Tahoe with <span className='primary-color'>Tom</span>
        </p>
        <Card.Title className='card-title'>Hiking Mt.Tallac</Card.Title>
        <p>$20 - 2 hours - Hiking</p>
      </Card.Body>
    </Card>
  );
}

export default ExperienceCard;
