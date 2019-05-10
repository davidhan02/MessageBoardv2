import React, { Component, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Profile from './Profile';
import Spinner from '../../common/spinner/Spinner';
import * as profileActions from '../../../actions/profileActions';

class ShowProfile extends Component {
  componentDidMount() {
    const { userId, handle } = this.props.match.params;
    if (userId) {
      this.props.getProfileById(userId);
    } else if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profiles;
    if (profile === null && !loading) {
      return <h1>No profile found</h1>;
    } else if (profile === null || loading) {
      return <Spinner />;
    } else {
      return <Profile profile={profile} />;
    }
  }
}

ShowProfile.propTypes = {
  profiles: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = ({ profiles }) => ({ profiles });

export default connect(
  mapStateToProps,
  profileActions
)(ShowProfile);
