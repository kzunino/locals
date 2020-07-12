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

      <h3 className='mt-4 pl-3'>About</h3>

      <div className='container-lg'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='mb-3  mb-m-0'>
              Visiting a new city can be a fun and thrilling experience. But on
              a limited timetable, it can also be stressful. Which neighborhoods
              do you visit? What's the best place to eat and shop? Should you go
              for the tourist-friendly side of town or dive deep into the city
              that the locals are used to? It's a good idea to get the answers
              to these questions before you actually travel to the city. You
              don't want to spend the first part of your trip sorting through
              all the options available to you.
            </div>
          </div>

          <div className='col-sm-12 col-md-6'>
            <div>
              Whatever you choose to do, do it with locals. Not mass tourism.
              Just pick a local guide who knows the area and adores their city.
              Someone who wants to show you their city through their eyes––in
              any way you want. Choose someone who loves the same things as you.
              Connect over food, over music, over architecture. Connect with the
              heartbeat of a city. Don’t just see the city. Become part of the
              city's story. Together. With locals.
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Featured;
