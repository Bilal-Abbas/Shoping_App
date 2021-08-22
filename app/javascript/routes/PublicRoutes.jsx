import React from "react";
import { Route, Redirect } from "react-router-dom";
import storage from "../helpers/storage";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  var localData = storage.get("_appLogged");
  const isLogin =
    (localData && localData.logged && localData.logged.success) || false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? (
          <Redirect to="/products" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
