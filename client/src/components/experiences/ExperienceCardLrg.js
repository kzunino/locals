import React from 'react';
import Card from 'react-bootstrap/Card';
import SampleImg from '../../img/experience-sample.jpg';
import Portrait from '../../img/portrait.jpg';

function ExperienceCardLrg() {
  return (
    <Card className='experience-card-lrg bg-color'>
      <Card.Img variant='top' src={SampleImg} />
      <img src={Portrait} alt='' className='experience-user-avatar-lrg' />
      <Card.Body className='pt-0 pb-0'>
        <p className='experience-subheading-lrg'>
          Enjoy Tahoe with <span className='primary-color'>Tom</span>
        </p>
        <Card.Title className='card-title'>Hiking Mt.Tallac</Card.Title>
        <p>$20 - 2 hours - Hiking</p>
      </Card.Body>
    </Card>
  );
}

export default ExperienceCardLrg;
