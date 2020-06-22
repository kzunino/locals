import React, {useState} from 'react';
import axios from 'axios';
//import setAuthToken from '../../utilites/setAuthToken';
import StockCoverPhoto from '../../img/empty-cover-photo.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditAvatar({context}) {
  const [avatar, setAvatar] = useState({});

  const [image, setImage] = useState('');
  const config = {
    headers: {
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  const uploadImage = async (e) => {
    const file = e.target.files;
    const body = new FormData();
    body.append('file', file[0]);
    body.append('upload_preset', 'locals_images');
    // body.headers('Access-Control-Allow-Origin', 'http://localhost:3000');
    //get request
    const res = await axios
      .post('https://api.cloudinary.com/v1_1/localscloud', body, config)
      .then((res) => console.log(res.data.secure_url))
      .catch((err) => console.log(err));
    // file = await res.json();
    // console.log(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //fires login action
    //if errors are returned it takes error object values and adds them to error array

    const res = await context.actions.signUp(avatar);
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
          <h1 className='primary-color'>Change Profile Picture</h1>

          <Form.Group controlId='formBasicProfilePicture'>
            <img
              src={StockCoverPhoto}
              alt=''
              className='edit-profile-picture'
            />
            <Form.Control type='file' name='avatar' onChange={uploadImage} />
          </Form.Group>

          <Button size='md' variant='secondary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditAvatar;
