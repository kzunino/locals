import React, {Component} from 'react';
import axios from 'axios';
//import config from './config';
const Context = React.createContext();

const api = axios.create({
  baseUrl: `http://localhost:5000`,
});

export class Provider extends Component {
  state = {userToken: null};

  render() {
    const {userToken} = this.state;

    const value = {
      userToken,
      //stores any handlers or actions to perform on data passed through context
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    //returns provider components with value prop
    //this.props.children passes in all props to components
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (email, password) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = JSON.stringify({email, password});
    console.log(data);
    try {
      const res = await fetch(
        'http://localhost:5000/auth',
        {method: 'post'},
        data,
        {
          headers,
        }
      );
      //   console.log(res);
      //   this.setState({
      //     userToken: res.data,
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  signOut = () => {
    this.setState(() => {
      return {
        userToken: null,
      };
    });
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
