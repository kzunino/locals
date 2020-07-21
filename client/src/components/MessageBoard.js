import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PostItem from './posts/PostItem';
import PostForm from './posts/PostForm';
import withContext from '../Context';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostFormWithContext = withContext(PostForm);
const PostItemWithContext = withContext(PostItem);

function MessageBoard({context, context: {user_uid}}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  //gets first five posts...offset is 5 posts in order to show infinite scroll functions
  useEffect(() => {
    const getPosts = async () => {
      let res = await context.actions.get_posts(0);
      console.log(res);
      setPosts([...res]);
      //setPosts([...posts, ...res]);
    };
    getPosts();
  }, [context.actions]);

  //fires when user gets to bottom of post page on order to retrieve more posts
  //closure prevents setPage to decrement by one so the pages line up with offset
  const getMorePosts = async () => {
    let res = await context.actions.get_posts(page + 1);
    console.log(res);
    if (res === []) setPage(page - 1);
    else setPosts([...posts, ...res]);
  };

  //passes to child component and takes post uid callback
  const onPostDelete = (post_uid) => {
    let updatedPosts = posts.filter((post) => post_uid !== post.post_uid);

    setPosts(updatedPosts);
  };

  return (
    <div className='container-fluid'>
      <h1 className='mb-0'>Local Things To Do...</h1>
      {user_uid ? (
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
      {/* Bug issue, if !posts.length and user navigates away from posts and then goes back
      the infinite scroll fires simultaneously as useEffect and doesn't render the posts correctly
      if at all */}
      {posts.length ? (
        <InfiniteScroll
          className='container- post-wrapper pb-2'
          next={() => {
            setPage(page + 1);
            getMorePosts();
          }}
          hasMore={true}
          dataLength={posts.length}
        >
          {posts.map((post) => {
            return (
              <PostItemWithContext
                key={post.post_uid}
                postData={post}
                onPostDelete={onPostDelete}
              />
            );
          })}
        </InfiniteScroll>
      ) : null}
    </div>
  );
}

export default MessageBoard;
