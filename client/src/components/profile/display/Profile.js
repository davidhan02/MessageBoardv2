import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile = ({ profile }) => {
  return (
    <Row>
      <Col>
        <h1>{profile.handle}</h1>
      </Col>
    </Row>
  );
};

export default Profile;
