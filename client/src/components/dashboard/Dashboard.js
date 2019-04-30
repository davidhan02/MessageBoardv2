import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as profileActions from '../../actions/profileActions';
import ProfileButtons from '../dashboard/ProfileButtons';
import Spinner from '../common/spinner/Spinner';
import CreateProfile from './CreateProfile';
import isEmpty from '../../utils/is-empty';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  renderContent() {
    const { profile, loading } = this.props.profiles;
    if (profile === null || loading) {
      return <Spinner />;
    } else {
      if (isEmpty(profile)) {
        return <CreateProfile />;
      }
      return <h1>Profile here...</h1>;
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <Fragment>
        <Row className="dashboard">
          <Col lg={12} className="text-center">
            <h1 className="display-4">Welcome {user.name}</h1>
            <div className="m-3">
              <ProfileButtons />
            </div>
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
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profiles }) => ({ auth, profiles });

export default connect(
  mapStateToProps,
  profileActions
)(Dashboard);
