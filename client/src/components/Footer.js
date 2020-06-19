import React from 'react';

function Footer() {
  let date = new Date();

  return (
    <div className='container-fluid'>
      <h3 className='primary-color border-bottom mt-5'>Locals</h3>
      <table className='table-borderless text-center'>
        <thead>
          <tr>
            <th scope='col'>Contact</th>
            <th scope='col'>Support</th>
            <th scope='col'>Jobs</th>
          </tr>
        </thead>
        <tbody className='secondary'>
          <tr>
            <td>+1-415-222-2222</td>
            <td>Help Center</td>
            <td>Become a host</td>
          </tr>
          <tr>
            <td>Email: hello@locals.com</td>
            <td>Private Policy</td>
            <td>Become a partner</td>
          </tr>
          <tr>
            <td></td>
            <td>Cancellation</td>
            <td>Become and ambassador</td>
          </tr>
        </tbody>
      </table>
      <div className='mt-4'>
        <p className='text-center pt-2 border-top'>
          <small>&copy;{date.getFullYear()} Locals</small>
        </p>
      </div>
    </div>
  );
}

export default Footer;
