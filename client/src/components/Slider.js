import React from 'react';
import ExperienceCard from './ExperienceCard';

function Slider() {
  return (
    <div className='cards-slider'>
      <div className='cards-slider-wrapper'>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </div>
  );
}

export default Slider;
