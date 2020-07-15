import React from 'react';
import {Link} from 'react-router-dom';
import Footer from './Footer';

function NotFound() {
  return (
    <>
      <div className='container-fluid not-found '>
        <h3 className='text-center text-white pt-5'>404: Route not found</h3>
        <div className='text-center pt-4'>
          <Link to='/home' style={{textDecoration: 'none'}}>
            <button className='not-found-btn primary-color'>Find Locals</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
