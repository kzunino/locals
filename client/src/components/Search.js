import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Search() {
  const [query, setQuery] = useState({});

  const onChange = (e) => setQuery({...query, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h3 className='mt-4 pl-3'>Search Experiences</h3>
      <Form
        className='container-fluid form-inline'
        onSubmit={(e) => onSubmit(e)}
      >
        <Form.Group className='w-75 mb-0' controlId='formBasicSearch'>
          <Form.Control
            type='text'
            name='query'
            value={query.value}
            placeholder='Search experiences...'
            className='w-100 mr-auto'
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button className='ml-2' size='md' variant='secondary' type='submit'>
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Search;
