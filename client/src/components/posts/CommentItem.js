import React, {useState, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function CommentItem({
  context,
  context: {user_uid},
  commentData,
  commentData: {
    comment_uid,
    createdAt,
    first_name,
    last_name,
    comment_text,
    fk_user_uid,
    likeCounts,
    comment_likes,
    postLikes,
    user: {avatar},
  },
  onCommentDelete,
}) {
  const [liked, setLiked] = useState('');
  //const [likedTrue, setLikedTrue] = useState([]);
  const [count, setCount] = useState(null);
  // const [comments_likes_array, setComments_Likes_Array] = useState([]);

  useEffect(() => {
    // setComments_Likes_Array(comment_likes);
    setCount(likeCounts);

    const isPostLiked = (comment_likes) => {
      if (comment_likes.length) {
        for (let like of comment_likes) {
          if (like.user_uid === user_uid) {
            setLiked('liked');
            //setLikedTrue(true);
          }
        }
      }
    };
    isPostLiked(comment_likes);
  }, [likeCounts, comment_likes, user_uid]);

  const onDelete = async (comment_uid) => {
    onCommentDelete(comment_uid);
    const res = await context.actions.delete_comment(comment_uid);
    if (res === 200) {
      console.log('comment deleted');
    }
  };

  const onLike = async (comment_uid) => {
    const res = await context.actions.comment_like(comment_uid);
    if (res === 200) {
      console.log('comment liked');
    }
  };

  const afterLike = () => {
    if (liked.length) {
      // setLikedTrue(false);
      setLiked('');
      setCount(count - 1);
    } else {
      //setLikedTrue(true);
      setLiked('liked');
      setCount(count + 1);
    }
  };

  return (
    <div className='card-body p-0 pl-3 mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className=''>
            <img
              className='rounded-circle commenter-avatar'
              width='30'
              src={avatar || PortraitPlaceholder}
              alt=''
            />
          </div>
          <div className='ml-2 mr-2'>
            <p className=' m-0 comment-name'>
              {first_name} {last_name} &#8226;{' '}
              <span className='d-inline text-muted comment-date m-0'>
                <Moment format={'MM/DD/YYYY'}>{createdAt}</Moment>
              </span>
            </p>

            <p className='comment-text m-0'>{comment_text}</p>

            <button
              onClick={() => {
                onLike(comment_uid);
                afterLike();
              }}
              type='button'
              className='btn m-0 p-0 comment-like'
            >
              {count > 0 ? count : null}{' '}
              {/* <i className={`fas fa-thumbs-up ${liked}`} />{' '} */}
              Like
            </button>
            {fk_user_uid === user_uid ? (
              <button
                onClick={() => onDelete(comment_uid)}
                type='button'
                className='btn'
              >
                <i className='far fa-trash-alt'></i>{' '}
              </button>
            ) : null}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default CommentItem;
