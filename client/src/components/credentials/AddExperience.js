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
import ProfileButtons from '../dashboard/ProfileButtons';
import expFields from '../../utils/fields/experience';
import FormField from '../common/fields/FormField';
import AreaField from '../common/fields/AreaField';
import CheckBox from '../common/fields/CheckBox';

class AddExperience extends Component {
  state = { disabled: false };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    const { addExperience, history } = this.props;
    addExperience(formValues, history);
  };

  renderFields() {
    const { errors } = this.props;
    return expFields.map(({ label, name, type }) => {
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
        <Col lg={12} className="text-center">
          <h1 className="display-4">Add Experience</h1>
          <div className="m-3">
            <ProfileButtons />
          </div>
        </Col>
        <Col lg={8} className="m-auto">
          <p className="lead">
            Add any job or position you have had in the past or current:
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
              label="Currently Working Here"
              toggle={() => this.toggleDisabled()}
              component={CheckBox}
            />
            <Field
              name="description"
              label="Description"
              info="Tell us a little bit about the position"
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
