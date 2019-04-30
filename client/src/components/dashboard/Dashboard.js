import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import * as profileActions from '../../actions/profileActions';
import CreateProfile from '../profile/edit/CreateProfile';
import Spinner from '../common/spinner/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profiles;
    return (
      <Fragment>
        <Row className="dashboard">
          <Col className="text-center">
            <h1 className="display-4">Welcome {user.name}</h1>
          </Col>
        </Row>
        {profile === null || loading ? <Spinner /> : <CreateProfile />}
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
