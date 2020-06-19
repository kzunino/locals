import React from 'react';
import Button from 'react-bootstrap/Button';

function PostForm() {
  return (
    <div className='post-form'>
      <div className='primary-color'>
        <h3>Share something...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=''
      >
        <textarea
          name='text'
          cols='40'
          rows='5'
          placeholder='Create a post'
          required
          //   value={''}
          onChange={''}
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
