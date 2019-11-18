import React, {
  useCallback
} from "react";

import {
  Route,
  Redirect
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

function PrivateRoute({ children, redirectTo, ...rest }) {

  const nameOfRepository = useSelector(({repositories}) => (
    repositories.current
  ));

  const isAuthenticated = useCallback(() => (
    nameOfRepository !== undefined
  ), [nameOfRepository]);

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() ? 
          children : 
          <Redirect
            to={{
              pathname: (redirectTo || "/")
            }}
          />
      }
    />
  );
}

export default PrivateRoute;