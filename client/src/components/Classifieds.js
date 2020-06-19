import React from 'react';
import PostItem from './posts/PostItem';
import PostForm from './posts/PostForm';

function Classifieds() {
  return (
    <div className='container-fluid'>
      <h1 className='mb-0'>Local Things To Do...</h1>
      <p>Know of something happening? Share it here!</p>
      <PostForm />
      <PostItem />
      <PostItem />
    </div>
  );
}

export default Classifieds;
