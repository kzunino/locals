import React, {Fragment} from 'react';
import ExperienceCard from './ExperienceCard';

function Experiences() {
  return (
    <Fragment>
      <Fragment>
        <h3 className='mt-4 pl-3'>Experiences</h3>
        <div className='container-lg'>
          <div className='row justify-content-center'>
            <div className='col-auto experience'>
              <ExperienceCard />
            </div>
            <div className='col-auto experience'>
              <ExperienceCard />
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default Experiences;
