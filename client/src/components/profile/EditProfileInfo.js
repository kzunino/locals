import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function EditProfileInfo({context}) {
  const [profileData, setProfileData] = useState({
    bio: '',
    gender: '',
    date_of_birth: null,
    country: '',
    languages: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState([]);

  const {
    bio,
    gender,
    date_of_birth,
    country,
    languages,
    phone_number,
  } = profileData;

  const onChange = (e) =>
    setProfileData({...profileData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp(
      bio,
      gender,
      date_of_birth,
      country,
      languages,
      phone_number
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
          <h1 className='primary-color'>Profile Info</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicBio'>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type='text'
              name='bio'
              value={bio}
              placeholder='bio...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicDOB'>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type='date'
              value='2018-07-22'
              min='1900-01-01'
              name='date_of_birth'
              value={date_of_birth}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicGender'>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type='text'
              name='gender'
              value={gender}
              placeholder='gender...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicCountry'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              name='country'
              value={country}
              placeholder='country...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLanguages'>
            <Form.Label>Languages</Form.Label>
            <Form.Control
              type='text'
              name='languages'
              value={languages}
              placeholder='languages...'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPhoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              name='phone_number'
              value={phone_number}
              placeholder='gender...'
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

export default EditProfileInfo;
