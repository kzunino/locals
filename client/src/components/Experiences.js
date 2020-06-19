import React, {Fragment} from 'react';
import ExperienceCard from './ExperienceCard';

function Experiences() {
  return (
    <Fragment>
      <Fragment>
        <h3 className='mt-4 pl-3'>Experiences</h3>
        <div className='container-lg'>
          <div class='row justify-content-center'>
            <div class='col-auto experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto  experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto  experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto  experience'>
              <ExperienceCard />
            </div>
            <div class='col-auto experience'>
              <ExperienceCard />
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default Experiences;
