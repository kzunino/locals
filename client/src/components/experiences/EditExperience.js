import React, {useState} from 'react';
import CoverPhoto from '../../img/experience-sample.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// change 'photo' to cover photo in DB

function EditExperience({context}) {
  const [experienceData, setExperienceData] = useState({
    title: '',
    description: '',
    languages: '',
    group_size: '',
    cost: '',
    phone_number: '',
    street: '',
    city: '',
    zip_code: '',
    duration: '',
    start: '',
    included: '',
    recommended: '',
    cover_photo: '',
  });

  const [errors, setErrors] = useState([]);

  const {
    title,
    description,
    languages,
    group_size,
    cost,
    phone_number,
    street,
    city,
    zip_code,
    duration,
    start,
    included,
    recommended,
    cover_photo,
  } = experienceData;

  const onChange = (e) =>
    setExperienceData({...experienceData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp(
      title,
      description,
      languages,
      group_size,
      cost,
      phone_number,
      street,
      city,
      zip_code,
      duration,
      start,
      included,
      recommended,
      cover_photo
    );
    console.log(res);
    if (res === 200) {
      //history.push('/home');
    } else if (res.errors) {
      setErrors([[], ...res.errors]);
    }
  };

  const ErrorsDisplay = () => {
    let errorsDisplay = null;
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h4 className='validation--errors--label text-center secondary'>
            Validation errors:
          </h4>
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
        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h1 className='primary-color'>Create an Experience</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicCoverPhoto'>
            <Form.Label>Cover Photo</Form.Label>
            <img src={CoverPhoto} alt='' className='edit-cover-photo' />
            <Form.Control
              type='file'
              name='coverPhoto'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={title}
              placeholder='Name of experience...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='textarea'
              name='description'
              value={description}
              placeholder='Experience description...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLanguages'>
            <Form.Label>Languages</Form.Label>
            <Form.Control
              type='text'
              name='languages'
              value={languages}
              placeholder='English, Spanish, etc...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicGroupSize'>
            <Form.Label>Group Size</Form.Label>
            <Form.Control
              type='text'
              name='group_size'
              value={group_size}
              placeholder='Max group size...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicCost'>
            <Form.Label>$Cost</Form.Label>
            <Form.Control
              type='text'
              name='cost'
              value={cost}
              placeholder='100...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLanguages'>
            <Form.Label>Languages</Form.Label>
            <Form.Control
              type='text'
              name='languages'
              value={languages}
              placeholder='English, Spanish, etc...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPhoneNumber'>
            <Form.Label>Phone Number</Form.Label>

            <Form.Control
              type='tel'
              name='phone_number'
              value={phone_number}
              maxLength='10'
              pattern='[0-9]{3}[0-9]{3}0-9]{4}'
              placeholder='Phone Number...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='1234 Main St' />
          </Form.Group>

          <Form.Row>
            <Form.Group controlId='formGridCity'>
              <Form.Label>City</Form.Label>
              <Form.Control type='text' placeholder='City' />
            </Form.Group>

            <Form.Group controlId='formGridState'>
              <Form.Label>State</Form.Label>
              <Form.Control
                type='text'
                maxLength='2'
                placeholder='CA'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='formGridZip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type='text'
                maxLength='5'
                pattern='[0-9]+'
                title='please enter number only'
                placeholder='Zip Code...'
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId='formBasicStart'>
            <Form.Label>Start Time</Form.Label>
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

          <Button size='md' variant='secondary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditExperience;
