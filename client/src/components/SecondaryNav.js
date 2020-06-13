import React from 'react';
import Nav from 'react-bootstrap/Nav';

const SecondaryNav = () => {
  return (
    <Nav className='justify-content-center secondary-nav p-1' activeKey='/'>
      <Nav.Item className='secondary-nav-item'>
        <Nav.Link href='/' eventKey='/' className='text-secondary'>
          Featured
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='secondary-nav-item'>
        <Nav.Link href='/experiences' eventKey='one' className='text-secondary'>
          Experiences
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/classifieds' eventKey='two' className='text-secondary'>
          Classifieds
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SecondaryNav;
