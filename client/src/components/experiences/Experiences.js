import React, {Fragment, useState, useEffect} from 'react';
import ExperienceCardLrg from './ExperienceCardLrg';
import withContext from '../../Context';

const ExperienceCardLrgWithContext = withContext(ExperienceCardLrg);

//make a call to the api and req experiences and render them with offset of 10 at a time
function Experiences({context}) {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    const getExperiences = async () => {
      const res = await context.actions.get_experiences();
      console.log(res);
      setExperienceData(res);
    };
    getExperiences();
  }, [context.actions]);

  let experience;
  if (experienceData) {
    experience = experienceData.map((experience) => {
      return (
        <div className='col-md-6 col-lg-4'>
          <ExperienceCardLrgWithContext
            key={experience.adventure_uid}
            experienceData={experience}
          />
        </div>
      );
    });
  }

  return (
    <Fragment>
      <Fragment>
        <h3 className='mt-4 pl-3'>Experiences</h3>
        <div className='container-lg '>
          <div className='row justify-content-center '>{experience}</div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default Experiences;
