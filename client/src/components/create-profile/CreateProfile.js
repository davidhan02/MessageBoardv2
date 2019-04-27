import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { clearErrors } from '../../actions/authActions';
import { submitProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  onSubmit = formValues => {
    const { submitProfile, history } = this.props;
    submitProfile(formValues, history);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <Row className="create-profile">
        <Col md={8} className="m-auto">
          <h1 className="display-4 text-center">Create Profile</h1>
          <p className="lead text-center">Input some of your information</p>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field name="test" type="text" component="input" />
            <Button variant="primary" size="lg" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  submitProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

const formWrap = reduxForm({
  form: 'profileForm'
})(CreateProfile);

export default connect(
  mapStateToProps,
  { submitProfile, clearErrors }
)(formWrap);
