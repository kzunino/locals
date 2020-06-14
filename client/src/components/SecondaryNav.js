import React from 'react';
import Nav from 'react-bootstrap/Nav';

const SecondaryNav = () => {
  return (
    <Nav className='justify-content-center secondary-nav p-1' activeKey='/'>
      <Nav.Item className='secondary-nav-item'>
        <Nav.Link href='/home' eventKey='/' className='secondary hover'>
          Featured
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='secondary-nav-item'>
        <Nav.Link
          href='/experiences'
          eventKey='one'
          className=' secondary hover'
        >
          Experiences
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href='/classifieds'
          eventKey='two'
          className='secondary hover'
        >
          Classifieds
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SecondaryNav;
