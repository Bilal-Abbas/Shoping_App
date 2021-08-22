import React from "react";
import { Route, Redirect } from "react-router-dom";
import storage from "../helpers/storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  var localData = storage.get("_appLogged");
  const isLogin =
    (localData && localData.logged && localData.logged.success) || false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
