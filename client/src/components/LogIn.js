import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LogIn({context}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    //fires login action
    await context.actions.signIn(email, password);
  };
  return (
    <div className='container pt-5'>
      <div className='form-size'>
        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h1 className='text-center primary-color'>Sign In</h1>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => onChange(e)}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button size='lg' block variant='secondary' type='submit'>
            Submit
          </Button>
          <p>
            Don't have a user account? <Link to='/signup'>Click here</Link> to
            sign up!
          </p>
          <Link to='/home' className='primary-color'>
            Back
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default LogIn;
