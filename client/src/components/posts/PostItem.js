import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
//import TextareaAutosize from 'react-autosize-textarea';

import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function PostItem({
  context,
  context: {user_uid},
  postData: {
    user: {avatar},
  },
  postData: {
    text,
    first_name,
    last_name,
    createdAt,
    post_uid,
    likeCounts,
    fk_user_uid,
  },
  postData: {post_likes},
  onPostDelete,
}) {
  const [liked, setLiked] = useState('');
  const [count, setCount] = useState(likeCounts);

  //const [likedTrue, setLikedTrue] = useState([]);

  useEffect(() => {
    if (post_likes) {
      for (let like of post_likes) {
        if (like.user_uid === user_uid) {
          setLiked('liked');
          //setLikedTrue(true);
        }
      }
    }
  }, [post_likes, user_uid]);

  const onDelete = async (post_uid) => {
    //passes post uid up to parent to erase from the UI
    onPostDelete(post_uid);
    const res = await context.actions.delete_post(post_uid);
    if (res === 200) {
      console.log('post deleted');
    }
  };

  const onLike = async (post_uid) => {
    const res = await context.actions.like(post_uid);
    if (res) {
      console.log('post liked');
      console.log(res.data);
    }
  };

  const afterLike = () => {
    if (liked.length) {
      //setLikedTrue(false);
      setLiked('');
      setCount(count - 1);
    } else {
      // setLikedTrue(true);
      setLiked('liked');
      setCount(count + 1);
    }
  };

  return (
    <div className='card gedf-card mt-3'>
      <div className='card-header'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='mr-2'>
              <Link to='/' style={{textDecoration: 'none'}}>
                <img
                  className='rounded-circle'
                  width='45'
                  src={avatar || PortraitPlaceholder}
                  alt=''
                />
              </Link>
            </div>
            <div className='ml-2'>
              <Link
                to='/'
                className='primary-color'
                style={{textDecoration: 'none'}}
              >
                <div className='h5 m-0'>
                  {first_name} {last_name}
                </div>
              </Link>

              <div className='h7 text-muted'>
                <Moment format={'MM/DD/YYYY'}>{createdAt}</Moment>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className='card-body'>
        {/* <a className='card-link' href='#' alt=''></a> */}

        <p className='card-text'>{text}</p>
      </div>
      <div className='card-footer pb-0'>
        <div className='card-body p-0'>
          <button
            onClick={() => {
              onLike(post_uid);
              afterLike();
            }}
            type='button'
            className='btn'
          >
            {count > 0 ? count : null}{' '}
            <i className={`fas fa-thumbs-up ${liked}`} />{' '}
          </button>

          <Link to={`/post/${post_uid}`} className='btn '>
            <i className='far fa-comment'></i>{' '}
          </Link>
          {fk_user_uid === user_uid ? (
            <Fragment>
              <Link to={`/post/${post_uid}`} className='btn '>
                <i className='far fa-edit'></i>{' '}
              </Link>
              <button
                type='button'
                onClick={() => onDelete(post_uid)}
                className='btn'
              >
                <i className='far fa-trash-alt'></i>{' '}
              </button>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
