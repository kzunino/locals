import React, {useState, useEffect} from 'react';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditCoverPhoto({context}) {
  //state for avatar form data for POST req
  const [coverPhotoData, setCoverPhotoData] = useState([]);
  const [submitButtonDisplay, setSubmitButtonDisplay] = useState('hide');
  const [errors, setErrors] = useState([]);
  const [cover_photo, set_cover_photo] = useState(null);

  useEffect(() => {
    const get_cover_photo = async () => {
      let res = await context.actions.get_my_profile();
      console.log(res.profile);
      set_cover_photo(res.profile.cover_photo);
    };
    get_cover_photo();
  }, [context]);

  //console.log(cover_photo);
  const showSubmit = () => {
    setSubmitButtonDisplay('show');
  };
  const hideSubmit = () => {
    setSubmitButtonDisplay('hide');
  };

  const onChange = (e) => {
    setCoverPhotoData(e.target.files[0] || []);
    setErrors([]);
    showSubmit();
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(coverPhotoData);
    if (
      coverPhotoData === null ||
      coverPhotoData === undefined ||
      coverPhotoData.length === 0
    ) {
      return setErrors(['Please choose a photo to upload before updating']);
    }

    const res = await context.actions.update_profile_cover_photo(
      coverPhotoData
    );
    console.log(res);
    if (res) {
      set_cover_photo(res.result.url);
      hideSubmit();
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
          <h1 className='primary-color'>Change Cover Photo</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicProfilePicture'>
            {cover_photo ? (
              <img src={cover_photo} alt='' className='edit-cover-photo' />
            ) : (
              <img src={StockCoverPhoto} alt='' className='edit-cover-photo' />
            )}
            <Form.Control
              type='file'
              name='coverPhoto'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button
            size='md'
            variant='secondary'
            type='submit'
            className={submitButtonDisplay}
          >
            Update Cover Photo
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditCoverPhoto;
