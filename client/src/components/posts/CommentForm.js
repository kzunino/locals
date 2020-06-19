import React from 'react';
import Button from 'react-bootstrap/Button';

function CommentForm() {
  return (
    <div className='post-form'>
      <div className='primary-color'>
        <h3>Leave a comment...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        class='form my-1'
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          value={''}
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

export default CommentForm;
