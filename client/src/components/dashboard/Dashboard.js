import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getCurrentProfile } from '../../actions/profilesActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    let dashboardContent;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profiles;

    const noProfile = (
      <Fragment>
        <p className="lead text-muted">Welcome {user.name}</p>
        <p>You have not yet set up a profile, please add some information.</p>
        <Link to="/create-prof" className="btn btn-info btn-lg">
          Create a Profile
        </Link>
      </Fragment>
    );

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        dashboardContent = noProfile;
      }
    }

    return (
      <Row className="dashboard">
        <Col md={12}>
          <h1 className="display-4">Dashboard</h1>
          {dashboardContent}
        </Col>
      </Row>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profiles }) => ({ auth, profiles });

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
