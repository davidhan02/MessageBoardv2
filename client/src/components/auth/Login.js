import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const { submitLogin, history } = this.props;
    submitLogin(formValues, history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Row className="login">
        <Col md={8} className="m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your account</p>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            {this.renderFields()}
            <Button variant="primary" size="lg" type="submit" block>
              Login
            </Button>
            <Button variant="info" size="lg" href="/auth/google" block>
              Sign in with Google
            </Button>
            <p className="mt-3">
              No Account? <Link to="/register"> Register</Link>
            </p>
          </Form>
        </Col>
      </Row>
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
