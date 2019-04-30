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
import { addEducation } from '../../actions/profileActions';
import ProfileButtons from '../dashboard/ProfileButtons';
import eduFields from '../../utils/fields/education';
import FormField from '../common/fields/FormField';
import AreaField from '../common/fields/AreaField';
import CheckBox from '../common/fields/CheckBox';

class AddEducation extends Component {
  state = { disabled: false };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    const { addEducation, history } = this.props;
    addEducation(formValues, history);
  };

  renderFields() {
    const { errors } = this.props;
    return eduFields.map(({ label, name, type }) => {
      return (
        <Field
          key={name}
          name={name}
          type={type}
          label={label}
          errors={errors}
          controlId={name}
          component={FormField}
        />
      );
    });
  }

  toggleDisabled = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  render() {
    const { handleSubmit, errors } = this.props;
    return (
      <Row>
        <Col lg={8} className="m-auto">
          <h1 className="display-4 text-center mt-3">Add Education</h1>
          <div className="m-3 text-center">
            <ProfileButtons />
          </div>
          <p className="lead">
            Add any education or training you have had in the past or current:
          </p>
          <small className="d-block pb-3">* = required fields</small>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            {this.renderFields()}
            <Field
              name="to"
              type="date"
              label="To Date"
              errors={errors}
              component={FormField}
              disabled={this.state.disabled}
            />
            <Field
              name="current"
              label="Currently Studying Here"
              toggle={() => this.toggleDisabled()}
              component={CheckBox}
            />
            <Field
              name="description"
              label="Description"
              info="Tell us a little bit about what you learned"
              controlId="description"
              component={AreaField}
            />
            <Button variant="primary" size="lg" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = ({ profiles, errors }) => ({ profiles, errors });

const formWrap = reduxForm({
  form: 'eduForm'
})(AddEducation);

export default connect(
  mapStateToProps,
  { addEducation, clearErrors }
)(withRouter(formWrap));
