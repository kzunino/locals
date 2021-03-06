import React, {Fragment} from 'react';

import Nav from 'react-bootstrap/Nav';

const NavBar = ({history, context, context: {userToken, first_name}}) => {
  const onClick = async (e) => {
    await context.actions.signOut();
    history.push('/home');
  };

  return (
    <Nav className='justify-content-end nav sticky-top'>
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
            <Nav.Link href='/profile/me' className='nav-item'>
              Welcome, {first_name}!
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href='/dashboard' className='nav-item'>
              Experiences
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href='' onClick={(e) => onClick(e)} className='nav-item'>
              Log Out
            </Nav.Link>
          </Nav.Item>
        </Fragment>
      )}
    </Nav>
  );
};

export default NavBar;
