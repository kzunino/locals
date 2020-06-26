import React from 'react';
import {Link} from 'react-router-dom';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function PostItem2() {
  return (
    <div className='card gedf-card'>
      <div className='card-header'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='mr-2'>
              <img
                className='rounded-circle'
                width='45'
                src='https://picsum.photos/50/50'
                alt=''
              />
            </div>
            <div className='ml-2'>
              <div className='h5 m-0'>LeeCross</div>
              <div className='h7 text-muted'>10 min ago</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className='card-body'>
        <a className='card-link' href='#'></a>

        <p className='card-text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor sequi
          fuga quia quaerat cum, obcaecati hic, molestias minima iste
          voluptates.
        </p>
      </div>
      <div className='card-body pb-0'>
        <a href='#' class='card-link'>
          <i class='fa fa-gittip'></i> Like
        </a>
        <a href='#' className='card-link'>
          <i className='fa fa-comment'></i> Comments
        </a>
      </div>
      {/* Comment */}

      {/* end of comment */}
      <div className='card-footer'>
        <img
          className='rounded-circle mr-2'
          width='10'
          src='https://picsum.photos/50/50'
          alt=''
        />
        <input type='textarea' className='ml-2 mr-2'></input>
        <button className='btn btn-secondary btn-sm'>Add Comment</button>
      </div>
    </div>
  );
}

export default PostItem2;
