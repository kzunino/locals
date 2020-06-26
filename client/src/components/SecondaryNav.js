import React from 'react';
import Nav from 'react-bootstrap/Nav';

const SecondaryNav = () => {
  return (
    <Nav className='justify-content-center secondary-nav p-1' activeKey='/'>
      <Nav.Item className='secondary-nav-item'>
        <Nav.Link
          href='/home/experiences'
          eventKey='/'
          className='secondary hover'
        >
          Experiences
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='secondary-nav-item'>
        <Nav.Link
          href='/home/messageboard'
          eventKey='one'
          className=' secondary hover'
        >
          Message Board
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href='/home/search'
          eventKey='two'
          className='secondary hover'
        >
          Search
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SecondaryNav;
