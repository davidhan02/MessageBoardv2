import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const ProfileAbout = ({ profile }) => {
  const firstName = profile.user.name.trim().split(' ')[0];
  const interests = profile.interests.map((interest, index) => (
    <div key={index} className="p-3">
      <i className="fa fa-check" /> {interest}
    </div>
  ));
  return (
    <Row className="profile-about">
      <Col md={12} className="mt-3">
        <Card body className="bg-light text-center">
          <h3 className="text-info">{firstName}'s Bio</h3>
          <p className="lead">
            {profile.bio || `${firstName} does not have a bio`}
          </p>
          <hr />
          <h3 className="text-info">{firstName}'s Interests</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {interests}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileAbout;
