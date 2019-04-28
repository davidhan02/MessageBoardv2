import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { submitProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import profileFields from '../../utils/fields/profile';
import validate from '../../utils/validation/profile';
import FormField from '../common/FormField';

class CreateProfile extends Component {
  onSubmit = formValues => {
    const { submitProfile, history } = this.props;
    submitProfile(formValues, history);
  };

  renderFields() {
    const { errors } = this.props;
    return profileFields.map(({ label, name, type, info }) => {
      return (
        <Field
          key={name}
          type={type}
          name={name}
          info={info}
          label={label}
          errors={errors}
          controlId={name}
          placeholder={label}
          component={FormField}
        />
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <p className="lead">
          You do not yet have a profile. You can create one here:
        </p>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Button variant="primary" size="lg" type="submit" block>
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object.isRequired,
  submitProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

const formWrap = reduxForm({
  validate,
  form: 'profileForm'
})(CreateProfile);

export default connect(
  mapStateToProps,
  { submitProfile, clearErrors }
)(formWrap);
