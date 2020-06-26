import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function PostItem({
  postData: {
    user: {avatar},
  },
  postData: {text, first_name, last_name, createdAt},
}) {
  //splices off the other values of ISO date
  let date = createdAt.substring(0, 0);

  return (
    <div className='post mt-3 pb-4 pt-4'>
      <div className='mt-4 mb-3'>
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
      </div>
      <div>
        <p className='post-text'> {text}</p>
        <p className='post-date'>
          <Moment format={'MM/DD/YYYY'} />
          {date}
        </p>
        {/* Conditionally render edit button for aut user */}
        <Fragment>
          <button onClick={''} type='button' class='btn btn-light'>
            <i class='fas fa-thumbs-up' />{' '}
          </button>

          <Link to='/post' class='btn btn-secondary '>
            Comment{' '}
          </Link>

          <button onClick={''} type='button' class='btn btn-danger'>
            <i class='fas fa-times'></i>
          </button>
        </Fragment>
      </div>
    </div>
  );
}

export default PostItem;
