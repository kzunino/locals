import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function PostItem({
  context,
  context: {user_uid},
  postData: {
    user: {avatar},
  },
  postData: {text, first_name, last_name, createdAt, post_uid, likeCounts},
  postData: {post_likes},
}) {
  //splices off the other values of ISO date
  let date = createdAt.substring(0, 0);

  const [liked, setLiked] = useState('');
  const [count, setCount] = useState(likeCounts);
  const [likedTrue, setLikedTrue] = useState([]);

  useEffect(() => {
    if (post_likes) {
      for (let like of post_likes) {
        if (like.user_uid === user_uid) {
          setLiked('liked');
          setLikedTrue(true);
        }
      }
    }
  }, [post_likes]);

  const onLike = async (post_uid) => {
    const res = await context.actions.like(post_uid);
    if (res === 200) {
      console.log('post liked');
    }
  };

  const afterLike = () => {
    if (liked.length) {
      setLikedTrue(false);
      setLiked('');
      setCount(count - 1);
    } else {
      setLikedTrue(true);
      setLiked('liked');
      setCount(count + 1);
    }
  };

  return (
    <div className='post mt-3 pb-2 pt-3'>
      <div className=''>
        <Link to='/' style={{textDecoration: 'none'}}>
          <img
            className='round-img'
            src={avatar || PortraitPlaceholder}
            alt=''
          />
          <h4 className='primary-color'>
            {first_name} {last_name}
          </h4>
        </Link>
        <p className='post-date'>
          <Moment format={'MM/DD/YYYY'} />
          {date}
        </p>
      </div>
      <div>
        <p className='post-text'> {text}</p>

        {/* Conditionally render edit button for aut user */}
        <Fragment>
          <button
            onClick={() => {
              onLike(post_uid);
              afterLike();
            }}
            type='button'
            class='btn'
          >
            {count > 0 ? count : null}{' '}
            <i className={`fas fa-thumbs-up ${liked}`} />{' '}
          </button>

          <Link to={`/post/${post_uid}`} class='btn '>
            <i class='far fa-comment'></i>{' '}
          </Link>

          <button onClick={''} type='button' class='btn'>
            <i className='far fa-trash-alt'></i>{' '}
          </button>
        </Fragment>
      </div>
    </div>
  );
}

export default PostItem;
