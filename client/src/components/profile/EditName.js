import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function EditName({context}) {
  const [nameData, setNameData] = useState({
    first_name: '',
    last_name: '',
  });
  const [errors, setErrors] = useState([]);

  const {first_name, last_name} = nameData;

  useEffect(() => {
    const getName = async () => {
      let res = await context.actions.get_my_profile();
      if (res === 400) res = await context.actions.create_profile();
      console.log(res.profile);
      setNameData({...res.profile.user});
    };
    getName();
  }, [context]);

  const onChange = (e) =>
    setNameData({...nameData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.update_name(first_name, last_name);
    console.log(res);
    if (res === 200) {
      setErrors([]);
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
              placeholder='First name'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='last_name'
              value={last_name}
              placeholder='Last Name'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button size='md' variant='secondary' type='submit'>
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditName;
