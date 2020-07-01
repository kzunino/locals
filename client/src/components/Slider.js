import React, {useRef} from 'react';
import ExperienceCard from './experiences/ExperienceCard';

function Slider({experiences}) {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  let eachExperience;

  console.log(experiences);

  if (experiences) {
    eachExperience = experiences.map((experience) => {
      return (
        <ExperienceCard
          key={experience.adventure_uid}
          experienceData={experience}
        />
      );
    });
  }

  return (
    <div className='cards-slider'>
      <div className='cards-slider-wrapper' ref={ref}>
        {eachExperience}

        {/* <ExperienceCard /> */}
      </div>
      <button
        className='scroll-left'
        type='button'
        onClick={() => scroll(-200)}
      >
        &lang;
      </button>
      <button
        className='scroll-right'
        type='button'
        onClick={() => scroll(200)}
      >
        &rang;
      </button>
    </div>
  );
}

export default Slider;
