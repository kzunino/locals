import React, {Component} from 'react';
import axios from 'axios';
//import config from './config';
const Context = React.createContext();

const config = {
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
};

export class Provider extends Component {
  state = {
    userToken: localStorage.getItem('token') || null,
    first_name: localStorage.getItem('first_name') || null,
  };

  render() {
    const {userToken, first_name} = this.state;

    const value = {
      userToken,
      first_name,
      //stores any handlers or actions to perform on data passed through context
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
      },
    };

    //returns provider components with value prop
    //this.props.children passes in all props to components
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (email, password) => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    //   },
    // };

    const body = JSON.stringify({email, password});
    console.log(body);
    try {
      const res = await axios.post(`http://localhost:5000/auth`, body, config);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('first_name', res.data.user.first_name);
        this.setState(() => {
          return {
            userToken: localStorage.getItem('token'),
            first_name: localStorage.getItem('first_name'),
          };
        });
        console.log(res.data);
        console.log(res.data.user.first_name);
        return 200;
      }
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  signOut = () => {
    this.setState(() => {
      return {
        userToken: null,
      };
    });
    localStorage.removeItem('token');
  };

  signUp = async (first_name, last_name, email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify({first_name, last_name, email, password});
    console.log(body);
    try {
      const res = await axios.post('http://localhost:5000/users', body, config);
      if (res.status === 201) {
        this.setState({
          userToken: res.data.token,
        });
        localStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
