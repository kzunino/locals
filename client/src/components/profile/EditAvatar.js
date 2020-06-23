import React, {useState} from 'react';
import axios from 'axios';
//import setAuthToken from '../../utilites/setAuthToken';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditAvatar({context}) {
  const [avatarData, setAvatarData] = useState([]);
  const [submitButtonDisplay, setSubmitButtonDisplay] = useState('hide');
  const [errors, setErrors] = useState([]);

  const showSubmit = () => {
    setSubmitButtonDisplay('show');
  };
  const hideSubmit = () => {
    setSubmitButtonDisplay('hide');
  };

  const onChange = (e) => {
    setAvatarData(e.target.files[0] || []);
    setErrors([]);
    showSubmit();
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(avatarData);
    if (
      avatarData === null ||
      avatarData === undefined ||
      avatarData.length === 0
    ) {
      return setErrors(['Please choose a photo to upload before updating']);
    }

    const res = await context.actions.update_profile_photo(avatarData);
    console.log(res);
    if (res.status === 200) {
      console.log('I uploaded the file bb');
      //history.push('/home');
    } else if (res.errors) {
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
        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h1 className='primary-color'>Change Profile Picture</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicProfilePicture'>
            <img
              src={StockCoverPhoto}
              alt=''
              className='edit-profile-picture'
            />
            <Form.Control
              type='file'
              name='avatar'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button
            size='md'
            variant='secondary'
            type='submit'
            className={submitButtonDisplay}
          >
            Update Photo
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditAvatar;
