import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  return (
    <Nav className='justify-content-end nav'>
      <Nav.Item className='mr-auto'>
        <Nav.Link href='/home' className='nav-item'>
          Locals
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-1' className='nav-item'>
          Log In
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='signup'>
        <Nav.Link eventKey='link-2' className='nav-item'>
          Signup
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
