import React, {useState, Fragment} from 'react';
import StockExperiencePhoto from '../../img/empty-cover-photo.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditExpCoverPhoto({context, coverPhoto}) {
  //state for avatar form data for POST req
  const [coverPhotoData, setCoverPhotoData] = useState([]);
  const [submitButtonDisplay, setSubmitButtonDisplay] = useState('hide');
  const [errors, setErrors] = useState([]);
  const [cover_photo, set_cover_photo] = useState(null);

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

    const res = await context.actions.upload_exp_cover_photo(coverPhotoData);
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
    <Fragment>
      <Form className='container mb-3' onSubmit={(e) => onSubmit(e)}>
        <h3>Choose a cover photo</h3>

        <ErrorsDisplay />

        <Form.Group controlId='formBasicCoverPhoto'>
          <img
            src={cover_photo || coverPhoto || StockExperiencePhoto}
            alt=''
            className='edit-experience-photo'
          />
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
    </Fragment>
  );
}

export default EditExpCoverPhoto;
