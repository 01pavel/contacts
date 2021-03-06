import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../../services/authService';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authService.isAuthenticated()) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }
    }}
  />
);

export default ProtectedRoute;
