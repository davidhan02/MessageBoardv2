import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getCurrentProfile } from '../../actions/profileActions';
import DashboardProfile from './DashboardProfile';
import CreateProfile from './CreateProfile';
import Spinner from '../common/spinner/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  renderContent() {
    const { profile, loading } = this.props.profiles;
    if (profile === null || loading) {
      return <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        return <DashboardProfile />;
      } else {
        return <CreateProfile />;
      }
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <Fragment>
        <Row className="dashboard">
          <Col className="text-center">
            <h1 className="display-4">Welcome {user.name}</h1>
          </Col>
        </Row>
        {this.renderContent()}
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
