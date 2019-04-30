import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProfileForm from './ProfileForm';
import ProfileButtons from '../../dashboard/ProfileButtons';
import { getCurrentProfile } from '../../../actions/profileActions';

class EditProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <Fragment>
        <Row className="dashboard">
          <Col lg={12} className="text-center">
            <h1 className="display-4">Edit Profile</h1>
            <div className="m-3">
              <ProfileButtons />
            </div>
          </Col>
        </Row>
        <ProfileForm />
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { getCurrentProfile }
)(EditProfile);
