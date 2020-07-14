import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from './Context';

//destructures component as prop and stores it in parameters
//It also collects any props that get passed to it in a ...rest variable
//See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
export default ({component: Component, ...rest}) => {
  //if redirected the original pathname is saved to state and passed to sign-in component
  // after sign in is authenitcated, {from} is used to redirect user to original page
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.user_uid ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {from: props.location},
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
