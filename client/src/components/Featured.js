import React, {Fragment, useState, useEffect} from 'react';
import Slider from './Slider';
import withContext from '../Context';

const SliderWithContext = withContext(Slider);

const Featured = () => {
  useEffect(() => {});
  return (
    <Fragment>
      <h3 className='mt-4 pl-3'>Featured Experiences</h3>
      <SliderWithContext />
    </Fragment>
  );
};

export default Featured;
