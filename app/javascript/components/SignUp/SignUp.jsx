import React from "react";
import { withRouter, Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../helpers/api";
import "./SignUp.css";

const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter you name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  renderError = (message) => <p className="help is-danger">{"*" + message}</p>;

  handleSubmit = async (data) => {
    console.log("This is the data", data);
    const res = await api.signup(data);
    if (res) {
      this.props.history.push("/products");
    }
  };
  render() {
    return (
      <div className="signup-form">
        <div className="jumbotron d-flex align-items-center">
          <div className="container">
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, onSubmitProps) => {
                this.handleSubmit({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                });
                onSubmitProps.resetForm();
              }}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    name="name"
                  />
                  <ErrorMessage name="name" render={this.renderError} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <Field
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
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
                  Signup
                </button>
              </Form>
            </Formik>
            <div className="login-link">
              <span>Already have an account! </span>
              <Link to="/login">Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
