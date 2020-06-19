import React from 'react';
import {Link} from 'react-router-dom';
import Portrait from '../../img/portrait.jpg';

function CommentItem() {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={``} style={{'text-decoration': 'none'}}>
          <img class='round-img' src={Portrait} alt='' />
          <h4>Commenter Name</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>This is my comment</p>
        <p class='post-date'>
          Posted on ..
          {/* Posted on <Moment format='DD/MM/YYYY'>{date}</Moment> */}
        </p>
        {/* {!auth.loading && user === auth.user._id && ( */}
        <button onClick={''} type='button' className='btn btn-danger'>
          <i className='fas fa-times' />
        </button>
        {/* )} */}
      </div>
    </div>
  );
}

export default CommentItem;
