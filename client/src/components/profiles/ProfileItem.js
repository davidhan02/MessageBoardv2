import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
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
          <Link to={`/handle/${profile.handle}`}>
            <strong>{profile.user.name}</strong>
          </Link>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md>
              <InfoCol profile={profile} />
            </Col>
            <Col md>list posts here</Col>
            <Col lg={3} className="d-none d-lg-block">
              <ListGroup variant="flush">
                <ListGroup.Item className="lead">
                  Interests include:
                </ListGroup.Item>
                {profile.interests.slice(0, 4).map((skill, index) => (
                  <ListGroup.Item key={index}>
                    <i className="far fa-star pr-3" />
                    {skill}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
