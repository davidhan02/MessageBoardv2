import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import * as profileActions from '../../actions/profileActions';
import CreateProfile from '../profile/edit/CreateProfile';
import Spinner from '../common/spinner/Spinner';
import ProfileButtons from './ProfileButtons';
import isEmpty from '../../utils/is-empty';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  renderHeader() {
    const { profile } = this.props.profiles;
    if (isEmpty(profile))
      return (
        <p className="lead">
          You don't have a profile, but you can create one here:
        </p>
      );
    return (
      <div className="m-3">
        <ProfileButtons />
      </div>
    );
  }

  renderContent() {
    const { profile, loading } = this.props.profiles;
    if (profile === null || loading) {
      return <Spinner />;
    }
    if (isEmpty(profile)) {
      return <CreateProfile />;
    }
    return <h1>Dashboard display profile</h1>;
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <Fragment>
        <Row className="dashboard">
          <Col lg={12} className="text-center">
            <h1 className="display-4">Welcome {user.name}</h1>
            {this.renderHeader()}
          </Col>
        </Row>
        {this.renderContent()}
        <Row>
          <Col className="m-3 text-center">
            <Button variant="danger" onClick={this.onDeleteClick}>
              Delete my Account
            </Button>
          </Col>
        </Row>
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
  profileActions
)(Dashboard);
