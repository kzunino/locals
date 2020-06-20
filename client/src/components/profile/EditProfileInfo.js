import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditProfileInfo({context}) {
  const [profileData, setProfileData] = useState({
    bio: '',
    gender: '',
    date_of_birth: '',
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

  //gets max data for DOB field
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;

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
              as='textarea'
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
              min='1900-01-01'
              max={today}
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

          <Button size='md' variant='secondary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditProfileInfo;
