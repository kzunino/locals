import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

function VerifyProfile({context}) {
  //use ref to hide element if already a verified account

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp();
    console.log(res);
    if (res === 200) {
      //history.push('/home');
    } else if (res.errors) {
    }
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
              label='Check this switch to verify'
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default VerifyProfile;
