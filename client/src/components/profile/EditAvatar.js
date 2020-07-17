import React, {useState, useEffect} from 'react';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function EditAvatar({context}) {
  //state for avatar form data for POST req
  const [avatarData, setAvatarData] = useState([]);
  const [submitButtonDisplay, setSubmitButtonDisplay] = useState('hide');
  const [errors, setErrors] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get_cover_photo = async () => {
      let res = await context.actions.get_my_profile();
      console.log(res.profile);
      setAvatar(res.profile.user.avatar);
    };
    get_cover_photo();
  }, [context]);

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
    hideSubmit();
    if (res.status === 200) {
      console.log('I uploaded the file bb');
      //history.push('/home');
    } else if (res.errors) {
    }
    setLoading(false);
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
        <Form
          className='container'
          onSubmit={(e) => {
            setLoading(true);
            onSubmit(e);
          }}
        >
          <h1 className='primary-color'>Change Profile Picture</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicProfilePicture'>
            {avatar ? (
              <div className='edit-profile-picture-circular'>
                <img src={avatar} alt='' className='edit-profile-picture' />
              </div>
            ) : (
              <img
                src={PortraitPlaceholder}
                alt=''
                className='placeholder-img'
              />
            )}

            <Form.Control
              type='file'
              name='avatar'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          {loading ? (
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          ) : (
            <Button
              size='md'
              variant='secondary'
              type='submit'
              className={submitButtonDisplay}
            >
              Update Photo
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}

export default EditAvatar;
