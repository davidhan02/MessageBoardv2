import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../../common/spinner/Spinner';
import * as authActions from '../../../actions/authActions';

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && nextProps.profile.loading) {
      this.props.history.push('/asdf');
    }
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  authActions
)(Profile);
