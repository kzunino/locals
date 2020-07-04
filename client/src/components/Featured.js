import React, {Fragment, useState, useEffect} from 'react';
import Slider from './Slider';
import withContext from '../Context';

const SliderWithContext = withContext(Slider);

const Featured = ({context}) => {
  const [featuredData, setFeaturedData] = useState([]);
  useEffect(() => {
    const getFeatured = async () => {
      let res = await context.actions.get_featured_experiences();
      if (res) {
        console.log(res.featured);
        setFeaturedData(res.featured);
      }
    };

    getFeatured();
  }, [context.actions]);
  return (
    <Fragment>
      <h3 className='mt-4 pl-3'>Featured Experiences</h3>
      <SliderWithContext experiences={featuredData} />
    </Fragment>
  );
};

export default Featured;
