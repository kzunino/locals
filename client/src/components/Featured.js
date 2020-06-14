import React from 'react';
import ExperienceCard from './ExperienceCard';

const Featured = () => {
  return (
    <div className=' mt-5 cards-slider'>
      <div
        className='cards-slider-wrapper'
        style={{
          transform: `translateX(-${4 * (100 / 3)}`,
        }}
      >
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </div>
  );
};

export default Featured;
