import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function EditName({context}) {
  const [nameData, setNameData] = useState({
    first_name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState([]);

  const {first_name, last_name} = nameData;

  const onChange = (e) =>
    setNameData({...nameData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp(first_name, last_name);
    console.log(res);
    if (res === 200) {
      //history.push('/home');
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
    <div className='container-fluid border-bottom pb-4'>
      <div className='edit-profile-form'>
        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h1 className='primary-color'>Change Name</h1>

          <ErrorsDisplay errors={errors} />

          <Form.Group controlId='formBasicFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='first_name'
              value={first_name}
              placeholder='Tom'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='last_name'
              value={last_name}
              placeholder='Brady'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button size='md' variant='secondary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditName;
