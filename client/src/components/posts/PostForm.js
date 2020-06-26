import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

function PostForm({context}) {
  const [textData, setTextData] = useState({
    text: '',
  });
  const [errors, setErrors] = useState([]);

  const {text} = textData;

  const onChange = (e) => {
    setTextData({...textData, [e.target.name]: e.target.value});
  };
  const onSubmit = async (e) => {
    //e.preventDefault();

    const res = await context.actions.post(text);
    console.log(res);
    if (res === 200) {
      console.log('Post posted!');

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
    <div className='post-form'>
      <div className='primary-color'>
        <h3>Share something...</h3>
        <ErrorsDisplay errors={errors} />
      </div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className=''
      >
        <textarea
          type='text'
          cols='40'
          rows='5'
          name='text'
          value={text}
          placeholder='Create a post'
          required
          onChange={(e) => onChange(e)}
        ></textarea>
        <Button
          size='msm'
          variant='secondary'
          type='submit'
          className='post-btn'
        >
          Submit
        </Button>{' '}
      </form>
    </div>
  );
}

export default PostForm;
