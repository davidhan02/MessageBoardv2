import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InfoCol from './InfoCol';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <Card className="mt-3 mb-3">
        <Card.Header className="lead text-center">
          <strong>{profile.user.name}</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md>
              <InfoCol profile={profile} />
            </Col>
            <Col md>list posts here</Col>
            <Col md className="d-none d-lg-block">
              interests
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileItem;
