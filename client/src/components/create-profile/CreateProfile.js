import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { clearErrors } from '../../actions/authActions';
import { submitProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  render() {
    return (
      <div>
        <h1>CreateProfile</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

const formWrap = reduxForm({
  form: 'profileForm'
})(CreateProfile);

export default connect(
  mapStateToProps,
  { submitProfile, clearErrors }
)(formWrap);
