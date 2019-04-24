import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { submitRegister, clearErrors } from '../../actions/authActions';
import registerFields from '../../utils/fields/register';
import validate from '../../utils/validation/register';
import FormField from '../common/FormField';

class Register extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderFields() {
    const { errors } = this.props.auth;
    return registerFields.map(({ label, name, type }) => {
      return (
        <Field
          key={name}
          name={name}
          type={type}
          label={label}
          errors={errors}
          placeholder={label}
          component={FormField}
        />
      );
    });
  }

  onSubmit = formValues => {
    const { submitRegister, history } = this.props;
    submitRegister(formValues, history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Row className="register">
        <Col md={8} className="m-auto">
          <h1 className="display-4 text-center">Register</h1>
          <p className="lead text-center">Create a new account</p>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            {this.renderFields()}
            <Button variant="primary" size="lg" type="submit" block>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  submitRegister: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const formWrap = reduxForm({
  validate,
  form: 'registerForm'
})(Register);

export default connect(
  mapStateToProps,
  { submitRegister, clearErrors }
)(formWrap);
