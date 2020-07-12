import React from 'react';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
import Moment from 'react-moment';

function Review({
  reviewData: {createdAt, first_name, review},
  reviewData: {
    user: {avatar},
  },
}) {
  return (
    <div className='container-fluid pl-0 pr-0'>
      <div className='mt-3'>
        <div className='card-body p-0'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mr-2'>
                <img
                  className='rounded-circle'
                  width='45'
                  src={avatar || PortraitPlaceholder}
                  alt=''
                />
              </div>
              <div className='ml-2'>
                <div className='h6 m-0'>{first_name}</div>
                <div className='date-small text-muted'>
                  <Moment format={'MM/DD/YYYY'}>{createdAt}</Moment>
                </div>
              </div>
            </div>
          </div>
          <p className='mt-2 pb-3 border-bottom review-text'>{review}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
