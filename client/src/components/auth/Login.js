import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormField from '../common/FormField';
import { submitLogin, clearErrors } from '../../actions/authActions';

const loginFields = [
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password' }
];

class Login extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderFields() {
    const { errors } = this.props.auth;
    return loginFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          type={name}
          name={name}
          label={label}
          errors={errors}
          placeholder={label}
          component={FormField}
        />
      );
    });
  }

  onSubmit = formValues => {
    this.props.submitLogin(formValues, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="login">
        <h3>Login</h3>
        <a href="/auth/google">
          <span>Sign in with Google</span>
        </a>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Button variant="primary" size="lg" type="submit" block>
            Login
          </Button>
        </Form>
        <Form.Group>
          <Form.Label>No Account? </Form.Label>
          <Link to="/register"> Register</Link>
        </Form.Group>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  submitLogin: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const validate = formValues => {
  const errors = {};

  loginFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

const formWrap = reduxForm({
  validate,
  form: 'loginForm'
})(Login);

export default connect(
  mapStateToProps,
  { submitLogin, clearErrors }
)(formWrap);
