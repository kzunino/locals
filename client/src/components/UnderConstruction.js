import React from 'react';
import {Link} from 'react-router-dom';

function UnderConstruction() {
  return (
    <div>
      <div className='container-fluid not-found '>
        <h3 className='text-center text-white pt-5'>
          <i class='fas fa-tools'></i> Under Construction
        </h3>
        <div className='text-center pt-4'>
          <Link to='/home' style={{textDecoration: 'none'}}>
            <button className='not-found-btn primary-color'>Find Locals</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
