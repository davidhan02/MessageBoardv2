import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import CreateProfile from '../create-profile/CreateProfile';
import ProfileActions from './ProfileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    let dashboardContent;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profiles;

    const noProfile = <CreateProfile />;

    const hasProfile = (
      <Fragment>
        <p>Edit your profile, experience, and education here.</p>
        <ProfileActions />
        <p>Display profile and exp and edu here</p>
        <Button variant="danger" onClick={this.onDeleteClick}>
          Delete my Account
        </Button>
      </Fragment>
    );

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = hasProfile;
      } else {
        dashboardContent = noProfile;
      }
    }

    return (
      <Row className="dashboard">
        <Col md={12}>
          <h1 className="display-4">Welcome {user.name}</h1>
          {dashboardContent}
        </Col>
      </Row>
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
  { getCurrentProfile, deleteAccount }
)(Dashboard);
