import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getCurrentProfile } from '../../actions/profileActions';
import DashboardProfile from './DashboardProfile';
import Spinner from '../common/spinner/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profiles;
    return (
      <Fragment>
        <Row className="dashboard">
          <Col lg={12} className="text-center">
            <h1 className="display-4 mb-0">Welcome {user.name}</h1>
          </Col>
        </Row>
        {profile === null || loading ? <Spinner /> : <DashboardProfile />}
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profiles }) => ({ auth, profiles });

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
