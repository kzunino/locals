import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function VerifyProfile({context, history}) {
  //use ref to hide element if already a verified account

  const [verifyUser, setVerifyUser] = useState(false);
  const [submitButtonDisplay, setSubmitButtonDisplay] = useState('hide');

  const onChange = (e) => {
    setVerifyUser(!verifyUser);
    if (!verifyUser) setSubmitButtonDisplay('show');
    else setSubmitButtonDisplay('hide');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.verify_user();
    console.log(res);
  };
  return (
    <div className='container-fluid border-bottom pb-4'>
      <div className='edit-profile-form'>
        <Form className='container' onSubmit={(e) => onSubmit(e)}>
          <h1 className='primary-color'>Verify Profile</h1>

          <Form.Group controlId='formBasicVerifyProfile'>
            <Form.Check
              type='switch'
              id='custom-switch'
              value={verifyUser}
              label='Check this switch to verify'
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button
            size='md'
            variant='secondary'
            type='submit'
            className={submitButtonDisplay}
          >
            Verify User
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default VerifyProfile;
