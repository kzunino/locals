import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp({context, history, context: {userToken}}) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const {first_name, last_name, email, password} = formData;

  if (userToken) {
    return <Redirect to='/home' />;
  }

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp(
      first_name,
      last_name,
      email,
      password
    );
    console.log(res);
    if (res === 201) {
      history.push('/home');
      console.log(`SUCCESS! ${email}'s account was created`);
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
          <h1 className='text-center primary-color'>Sign Up</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='first_name'
              value={first_name}
              placeholder='Enter first name'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='last_name'
              value={last_name}
              placeholder='Enter last name'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

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
            Already have a user account?{' '}
            <Link to='/login' className='primary-color'>
              Click here
            </Link>{' '}
            to sign in!
          </p>
          <Link to='/home' className='primary-color'>
            Back
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
