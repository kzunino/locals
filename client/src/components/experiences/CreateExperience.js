import React, {useState} from 'react';
import StockExperiencePhoto from '../../img/empty-cover-photo.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// change 'photo' to cover photo in DB

function CreateExperience({history, context, context: verified}) {
  const [experienceData, setExperienceData] = useState({
    title: '',
    description: '',
    activity_type: '',
    languages: '',
    group_size: '',
    cost: '',
    phone_number: '',
    location: '',
    street: '',
    city: '',
    zip_code: '',
    duration: '',
    start: '',
    included: '',
    recommended: '',
    cover_photo: '',
  });

  const [submitButtonDisplay, setSubmitButtonDisplay] = useState('hide');
  const [errors, setErrors] = useState([]);

  const {
    title,
    description,
    activity_type,
    languages,
    group_size,
    cost,
    phone_number,
    location,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    included,
    recommended,
    cover_photo,
  } = experienceData;

  const showSubmit = () => {
    setSubmitButtonDisplay('show');
  };

  const onChange = (e) => {
    setExperienceData({...experienceData, [e.target.name]: e.target.value});
    showSubmit();
  };

  const onCoverPhotoChange = (e) => {
    setExperienceData({
      ...experienceData,
      cover_photo: [e.target.files[0]] || [],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await context.actions.create_experience(experienceData);

    if (cover_photo !== '') {
      const uploadCoverPhotoRes = await context.actions.upload_exp_cover_photo(
        cover_photo[0]
      );
      console.log(uploadCoverPhotoRes);
    }

    if (res.adventure) {
      //redirect to exp page
      history.push(`/experience/${res.adventure.adventure_uid}`);
    } else if (res.errors) {
      setErrors([[], ...res.errors]);
    }
  };

  const ErrorsDisplay = () => {
    let errorsDisplay = null;
    if (errors.length) {
      errorsDisplay = (
        <div>
          <div className='validation-errors text-center primary-color'>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return errorsDisplay;
  };
  return (
    <div className='container-fluid border-bottom pb-4'>
      <div className='edit-profile-form'>
        <h1 className='primary-color'>Create an Experience</h1>

        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h3>Choose a cover photo</h3>

          <Form.Group controlId='formBasicCoverPhoto'>
            <img
              src={StockExperiencePhoto}
              alt=''
              className='edit-experience-photo'
            />
            <Form.Control
              type='file'
              name='coverPhoto'
              onChange={(e) => onCoverPhotoChange(e)}
            />
          </Form.Group>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicTitle'>
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={title}
              placeholder='Name of experience...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicDescription'>
            <Form.Label>Description*</Form.Label>
            <textarea
              type='text'
              name='description'
              value={description}
              placeholder='Experience description...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicActivityType'>
            <Form.Label>One word description*</Form.Label>
            <Form.Control
              type='text'
              name='activity_type'
              value={activity_type}
              placeholder='Hiking, Dancing, Languages...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLocation'>
            <Form.Label>Location</Form.Label>

            <Form.Control
              type='text'
              name='location'
              value={location}
              placeholder='Lake Tahoe...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicDuration'>
            <Form.Label>Duration in hours*</Form.Label>
            <Form.Control
              type='text'
              name='duration'
              value={duration}
              placeholder='3, 2 ,10...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLanguages'>
            <Form.Label>Languages*</Form.Label>
            <Form.Control
              type='text'
              name='languages'
              value={languages}
              placeholder='English, Spanish, etc...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicGroupSize'>
            <Form.Label>Group Size*</Form.Label>
            <Form.Control
              type='text'
              name='group_size'
              value={group_size}
              placeholder='Max group size...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicCost'>
            <Form.Label>Cost*</Form.Label>
            <Form.Control
              type='text'
              name='cost'
              value={cost}
              placeholder='100...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPhoneNumber'>
            <Form.Label>Phone Number*</Form.Label>

            <Form.Control
              type='tel'
              name='phone_number'
              value={phone_number}
              maxLength='10'
              pattern='[0-9]{10}'
              placeholder='Phone Number...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Street*</Form.Label>
            <Form.Control
              type='text'
              value={street}
              name='street'
              placeholder='1234 Main St'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group controlId='formGridCity'>
              <Form.Label>City*</Form.Label>
              <Form.Control
                type='text'
                value={city}
                name='city'
                onChange={(e) => onChange(e)}
                placeholder='City'
              />
            </Form.Group>

            <Form.Group controlId='formGridState'>
              <Form.Label>State*</Form.Label>
              <Form.Control
                type='text'
                maxLength='2'
                value={state}
                name='state'
                onChange={(e) => onChange(e)}
                placeholder='CA'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='formGridZip'>
              <Form.Label>Zip*</Form.Label>
              <Form.Control
                type='text'
                maxLength='5'
                pattern='[0-9]+'
                title='please enter number only'
                value={zip_code}
                name='zip_code'
                onChange={(e) => onChange(e)}
                placeholder='Zip Code...'
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId='formBasicStart'>
            <Form.Label>Start Time*</Form.Label>
            <Form.Control
              type='text'
              name='start'
              value={start}
              placeholder='10AM...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicIncluded'>
            <Form.Label>Included</Form.Label>
            <Form.Control
              type='textarea'
              name='included'
              value={included}
              placeholder='What is included...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicRecommended'>
            <Form.Label>Recommended</Form.Label>
            <Form.Control
              type='textarea'
              name='recommended'
              value={recommended}
              placeholder='Whats recommended...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button
            size='md'
            variant='secondary'
            type='submit'
            className={submitButtonDisplay}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateExperience;
