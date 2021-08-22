import React from "react";
import { withRouter, Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../helpers/api";
import "./Login.css";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  renderError = (message) => <p className="help is-danger">{"*" + message}</p>;

  handleSubmit = async (data) => {
    const res = await api.login(data);
    if (res) {
      this.props.history.push("/products");
    }
  };
  render() {
    return (
      <div className="login-form">
        <div className="jumbotron d-flex align-items-center">
          <div className="container">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, onSubmitProps) => {
                this.handleSubmit({
                  email: values.email,
                  password: values.password,
                });
                onSubmitProps.resetForm();
              }}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <Field
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    // value={this.state.email}
                    // onChange={(event) => this.handleChange(event)}
                  />
                  <ErrorMessage name="email" render={this.renderError} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                  />
                  <ErrorMessage name="password" render={this.renderError} />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </Form>
            </Formik>
            <div className="signup-link">
              <span>Don't have an account! </span>
              <Link to="/signup">Sign Up Here</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
