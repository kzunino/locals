import React from 'react';

function CommentItem2() {
  return (
    <div className='card-body'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mr-2'>
            <img
              className='rounded-circle comment-avatar'
              width='45'
              src='https://picsum.photos/50/50'
              alt=''
            />
          </div>
          <div className='ml-2 mr-2'>
            <div className='h5 m-0 comment-name'>Commenter</div>
            <div className='h7 text-muted comment-date'>date</div>
            <p>I am a comment</p>
            <br></br>
            <a href='#' class='card-link'>
              <i class='fa fa-gittip'></i> Like
            </a>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default CommentItem2;
