import React, {useRef} from 'react';
import ExperienceCard from './experiences/ExperienceCard';
import withContext from '../Context';

const ExperienceCardWithContext = withContext(ExperienceCard);

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
        <ExperienceCardWithContext
          key={experience.adventure_uid}
          experienceData={experience}
        />
      );
    });
  }

  return (
    <div className='cards-slider'>
      <div className='cards-slider-wrapper' ref={ref}>
        {/* <ExperienceCards /> */}
        {eachExperience}
      </div>
      <button
        className='scroll-left slider-button'
        type='button'
        onClick={() => scroll(-200)}
        style={{textDecoration: 'none'}}
      >
        &lang;
      </button>
      <button
        className='scroll-right slider-button'
        type='button'
        onClick={() => scroll(200)}
      >
        &rang;
      </button>
    </div>
  );
}

export default Slider;
