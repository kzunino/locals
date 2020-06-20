import React, {Fragment} from 'react';

import Nav from 'react-bootstrap/Nav';

const NavBar = ({location, context, context: {userToken, first_name}}) => {
  const onClick = async (e) => {
    e.preventDefault();
    await context.actions.signOut();
  };

  return (
    <Nav className='justify-content-end nav'>
      <Nav.Item className='mr-auto'>
        <Nav.Link href='/home' className='nav-item'>
          Locals
        </Nav.Link>
      </Nav.Item>
      {!userToken & !first_name ? (
        <Fragment>
          <Nav.Item>
            <Nav.Link href='/login' className='nav-item'>
              Log In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='signup'>
            <Nav.Link href='/signup' className='nav-item'>
              Signup
            </Nav.Link>
          </Nav.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Nav.Item>
            <Nav.Link href='/home' className='nav-item'>
              Welcome, {first_name}!
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href='/home'
              onClick={(e) => onClick(e)}
              className='nav-item'
            >
              Log Out
            </Nav.Link>
          </Nav.Item>
        </Fragment>
      )}
    </Nav>
  );
};

export default NavBar;
