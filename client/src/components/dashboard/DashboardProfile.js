import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CreateProfile from './CreateProfile';
import ProfileButtons from './ProfileButtons';
import { deleteAccount } from '../../actions/profileActions';

class DashboardProfile extends Component {
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    return (
      <Fragment>
        <Row className="mt-5">
          <Col md={12} className="m-auto">
            <p>Edit your profile, experience, and education here.</p>
            <ProfileButtons />
            <Button variant="danger" onClick={this.onDeleteClick}>
              Delete my Account
            </Button>
          </Col>
        </Row>
        <CreateProfile />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { deleteAccount }
)(DashboardProfile);
