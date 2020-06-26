import React from 'react';
import {Link} from 'react-router-dom';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

function Post() {
  // Gets post by params and loads comment Items
  return (
    <div className='container'>
      <Link
        to='/home/messageboard'
        className='primary-color'
        style={{'text-decoration': 'none'}}
      >
        Back to Posts
      </Link>
      <PostItem post={''} />
      <CommentForm postId={''} />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      {/* <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div> */}
    </div>
  );
}

export default Post;
