import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Portrait from '../../img/portrait.jpg';

function PostItem() {
  return (
    <div className='post mt-3 pb-4 pt-4'>
      <div className='mt-4 mb-3'>
        <Link to='/' style={{textDecoration: 'none'}}>
          <img className='round-img' src={Portrait} alt='' />
          <h4 className='primary-color'>Tom Brady</h4>
        </Link>
      </div>
      <div>
        <p className='post-text'>
          {' '}
          LoremIpsum BabyLoremIpsum BabyLoremIpsum BabyLoremIpsum BabyLoremIpsum
          BabyLoremIpsum BabyLoremIpsum BabyLoremIpsum BabyLoremIpsum
          BabyLoremIpsum BabyLoremIpsum BabyLoremIpsum BabyLoremIpsum
          BabyLoremIpsum BabyLoremIpsum Baby
        </p>
        <p className='post-date'>10/15/21</p>
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
