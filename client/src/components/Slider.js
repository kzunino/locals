import React, {useRef} from 'react';
import ExperienceCard from './ExperienceCard';

function Slider() {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className='cards-slider'>
      <div className='cards-slider-wrapper' ref={ref}>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
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
