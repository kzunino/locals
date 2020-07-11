import React, {useState, Fragment} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import withContext from '../Context';
import ExperienceCardLrg from '../components/experiences/ExperienceCardLrg';
const ExperienceCardLrgWithContext = withContext(ExperienceCardLrg);

function Search({context}) {
  const [query, setQuery] = useState({});
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const onChange = (e) => setQuery({...query, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();

    //if query is whitespace only returns no results found
    if (!Object.values(query)[0].trim()) {
      setError(true);
      setResults([]);
      return;
    }

    const res = await context.actions.search_experiences(query);
    console.log(res);
    if (res === 404) {
      setError(true);
      setResults([]);
    } else {
      setError(false);
      setResults(res);
    }
  };

  let experience;
  if (results.length) {
    experience = results.map((result) => {
      return (
        <div className='col-md-6 col-lg-4' key={result.adventure_uid}>
          <ExperienceCardLrgWithContext experienceData={result} />
        </div>
      );
    });
  }

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

      {results.length ? (
        <Fragment>
          <h3 className='mt-4 pl-3'>Experiences:</h3>
          <div className='container-lg '>
            <div className='row justify-content-center '>{experience}</div>
          </div>
        </Fragment>
      ) : null}

      {error ? (
        <div className='container-lg mt-3'>
          <h6>No results found.</h6>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
