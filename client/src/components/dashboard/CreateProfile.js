import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import * as profileActions from '../../actions/profileActions';
import profileFields from '../../utils/fields/profile';
import validate from '../../utils/validation/profile';
import socialFields from '../../utils/fields/social';
import statusOptions from '../../utils/fields/status';
import SelectField from '../common/fields/SelectField';
import FormField from '../common/fields/FormField';
import AreaField from '../common/fields/AreaField';
import IconField from '../common/fields/IconField';
import isEmpty from '../../utils/is-empty';

class CreateProfile extends Component {
  state = { showSocialLinks: false };

  componentDidMount() {
    if (isEmpty(this.props.profiles.profile)) {
      this.props.getCurrentProfile();
    }
  }

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

const mapStateToProps = ({ profiles, errors }) => {
  let initialValues = {};
  const { profile } = profiles;

  if (!isEmpty(profile)) {
    const { twitter, facebook, linkedin, youtube, instagram } = profile.social;
    const social = { twitter, facebook, linkedin, youtube, instagram };
    initialValues = {
      ...profile,
      ...social,
      interests: profile.interests.join(', ')
    };
  }
  return {
    profiles,
    errors,
    initialValues
  };
};

const formWrap = reduxForm({
  validate,
  form: 'profileForm',
  enableReinitialize: true
})(CreateProfile);

export default connect(
  mapStateToProps,
  profileActions
)(withRouter(formWrap));
