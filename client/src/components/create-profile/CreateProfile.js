import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { submitProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import profileFields from '../../utils/fields/profile';
import validate from '../../utils/validation/profile';
import socialFields from '../../utils/fields/social';
import statusOptions from '../../utils/fields/status';
import SelectField from '../common/SelectField';
import FormField from '../common/FormField';
import AreaField from '../common/AreaField';
import IconField from '../common/IconField';

class CreateProfile extends Component {
  state = { showSocialLinks: false };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    const { submitProfile, history } = this.props;
    submitProfile(formValues, history);
  };

  renderStatus = () => {
    return (
      <Field
        name="status"
        info="Give us an idea of where you are at in your career."
        label="Career Status"
        controlId="status"
        component={SelectField}
        options={statusOptions}
      />
    );
  };

  renderFields = () => {
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
  };

  renderBioField = () => {
    return (
      <Field
        name="bio"
        info="Please tell us a little information about yourself"
        label="Short Bio"
        controlId="bio"
        placeholder="Short Bio"
        component={AreaField}
      />
    );
  };

  renderSocialFields = () => {
    if (this.state.showSocialLinks) {
      return socialFields.map(({ label, name, icon }) => {
        return (
          <Field
            key={name}
            type="text"
            name={name}
            icon={icon}
            label={label}
            controlId={name}
            placeholder={label}
            component={IconField}
          />
        );
      });
    }
  };

  toggleSocial = () => {
    this.setState(prevState => ({
      showSocialLinks: !prevState.showSocialLinks
    }));
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col lg={8} className="m-auto">
          <p className="lead text-center">
            You do not yet have a profile. You can create one here:
          </p>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            {this.renderStatus()}
            {this.renderFields()}
            {this.renderBioField()}
            <Form.Group>
              <Button variant="outline-info" onClick={this.toggleSocial} block>
                Toggle Social Links
              </Button>
            </Form.Group>
            {this.renderSocialFields()}
            <Button variant="primary" size="lg" type="submit" block>
              Save Profile
            </Button>
          </Form>
        </Col>
      </Row>
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
)(withRouter(formWrap));
