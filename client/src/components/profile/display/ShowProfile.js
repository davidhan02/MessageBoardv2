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

  renderProfile = () => {
    const { profile, loading } = this.props.profiles;
    if (profile === null && !loading) {
      return <h1>No profile found</h1>;
    } else if (profile === null || loading) {
      return <Spinner />;
    } else {
      return <Profile profile={profile} />;
    }
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col lg={12} className="text-center">
            <h1 className="display-4">Profile Display</h1>
            <p className="lead">This is a profile test</p>
          </Col>
        </Row>
        {this.renderProfile()}
      </Fragment>
    );
  }
}

ShowProfile.propTypes = {
  profiles: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = ({ profiles }) => ({ profiles });

export default connect(
  mapStateToProps,
  profileActions
)(ShowProfile);
