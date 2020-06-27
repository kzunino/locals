import React from 'react';
import {Link} from 'react-router-dom';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function CommentItem({commentData}) {
  return (
    <div className='card-body p-0 pl-3 mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className=''>
            <img
              className='rounded-circle commenter-avatar'
              width='30'
              src='https://picsum.photos/50/50'
              alt=''
            />
          </div>
          <div className='ml-2 mr-2'>
            <p className=' m-0 comment-name'>
              Commenter{' '}
              <p className='d-inline text-muted comment-date m-0'>date</p>
            </p>

            <p className='comment-text m-0'>I am a comment</p>

            <button
              // onClick={() => {
              //   onLike(post_uid);
              //   afterLike();
              // }}
              type='button'
              class='btn m-0 p-0 comment-like'
            >
              {/* {count > 0 ? count : null}{' '} */}
              {/* <i className={`fas fa-thumbs-up ${liked}`} />{' '} */}
              Like
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default CommentItem;
