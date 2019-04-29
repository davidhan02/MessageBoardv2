import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { clearErrors } from '../../actions/authActions';
import { addExperience } from '../../actions/profileActions';
import FormField from '../common/fields/FormField';

class AddExperience extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    const { addExperience, history } = this.props;
    addExperience(formValues, history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col md={8} className="m-auto">
          <h1 className="display-4 text-center">Add Experience</h1>
          <p className="lead text-center">
            Add any job or position you have had in the past or current:
          </p>
          <small className="d-block pb-3">* = required fields</small>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field component="input" type="text" name="text" />
            <Button variant="primary" size="lg" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = ({ profiles, errors }) => ({ profiles, errors });

const formWrap = reduxForm({
  form: 'expForm'
})(AddExperience);

export default connect(
  mapStateToProps,
  { addExperience, clearErrors }
)(withRouter(formWrap));
