import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LogIn({context, history, context: {userToken}}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const {email, password} = formData;

  // Redirect if already logged in
  if (userToken) {
    return <Redirect to='/home' />;
  }

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signIn(email, password);
    console.log(res);
    if (res === 200) {
      history.push('/home');
      console.log(`SUCCESS! ${email} is logged in`);
    } else if (res.errors) {
      setErrors([[], ...res.errors]);
    }
  };

  const ErrorsDisplay = () => {
    let errorsDisplay = null;
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h4 className='validation--errors--label text-center secondary'>
            Validation errors:
          </h4>
          <div className='validation-errors text-center primary-color'>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return errorsDisplay;
  };

  return (
    <div className='container pt-5'>
      <div className='form-size'>
        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h1 className='text-center primary-color'>Sign In</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => onChange(e)}
            />
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
            Don't have a user account?{' '}
            <Link to='/signup' className='primary-color'>
              Click here
            </Link>{' '}
            to sign up!
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
