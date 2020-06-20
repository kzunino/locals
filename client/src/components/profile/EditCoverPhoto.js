import React, {useState} from 'react';
import CoverPhoto from '../../img/experience-sample.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditCoverPhoto({context}) {
  const [coverPhoto, setCoverPhoto] = useState({});

  const [errors, setErrors] = useState([]);

  const onChange = (e) =>
    setCoverPhoto({...coverPhoto, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp(coverPhoto);
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
          <h1 className='primary-color'>Change Cover Photo</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicProfilePicture'>
            <img src={CoverPhoto} alt='' className='edit-cover-photo' />
            <Form.Control
              type='file'
              name='coverPhoto'
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

export default EditCoverPhoto;
