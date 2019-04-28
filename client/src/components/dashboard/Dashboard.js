import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getCurrentProfile } from '../../actions/profileActions';
import DashboardProfile from './DashboardProfile';
import CreateProfile from './CreateProfile';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    let dashboardContent;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profiles;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <DashboardProfile />;
      } else {
        dashboardContent = <CreateProfile />;
      }
    }

    return (
      <Fragment>
        <Row className="dashboard">
          <Col className="text-center">
            <h1 className="display-4">Welcome {user.name}</h1>
          </Col>
        </Row>
        {dashboardContent}
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profiles }) => ({ auth, profiles });

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
