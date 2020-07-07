import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PostItem from './posts/PostItem';
import PostForm from './posts/PostForm';
import withContext from '../Context';

const PostFormWithContext = withContext(PostForm);
const PostItemWithContext = withContext(PostItem);

function MessageBoard({context, context: {verified}}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      let res = await context.actions.get_posts();
      console.log(res.posts);
      setPosts([...res.posts]);
    };
    getPosts();
  }, [context]);

  //passes to child component and takes post uid callback
  const onPostDelete = (post_uid) => {
    let updatedPosts = posts.filter((post) => post_uid !== post.post_uid);

    setPosts(updatedPosts);
  };

  return (
    <div className='container-fluid'>
      <h1 className='mb-0'>Local Things To Do...</h1>
      {verified ? (
        <Fragment>
          <p>Know of something happening? Share it here!</p>
          <PostFormWithContext />
        </Fragment>
      ) : (
        <p>
          Know of something happening?{' '}
          <Link
            to='/login'
            className='primary-color'
            style={{textDecoration: 'none'}}
          >
            Sign in{' '}
          </Link>
          to share!
        </p>
      )}
      <div className='container- post-wrapper'>
        {posts.map((post) => {
          return (
            <PostItemWithContext
              key={post.post_uid}
              postData={post}
              onPostDelete={onPostDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MessageBoard;
