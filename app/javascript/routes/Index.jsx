import React, { Component } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Products from "../components/Products";
import Order from "../components/Order";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      clientCookie: false,
      logout: false,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect strict exact from="/" to="/products" />
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />
          <PublicRoute
            restricted={true}
            component={SignUp}
            path="/signup"
            exact
          />
          <PrivateRoute component={Products} path="/products" exact />
          <PrivateRoute component={Order} path="/orders/:id" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
