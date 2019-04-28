import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ProfileActions from '../edit-profile/ProfileActions';
import { deleteAccount } from '../../actions/profileActions';

class DashboardProfile extends Component {
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    return (
      <Row className="mt-5">
        <Col md={12} className="m-auto">
          <p>Edit your profile, experience, and education here.</p>
          <ProfileActions />
          <p>Display profile and exp and edu here</p>
          <Button variant="danger" onClick={this.onDeleteClick}>
            Delete my Account
          </Button>
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  { deleteAccount }
)(DashboardProfile);
