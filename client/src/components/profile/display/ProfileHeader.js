import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import isEmpty from '../../../utils/is-empty';

const ProfileHeader = ({ profile }) => {
  return (
    <Row>
      <Col md={12}>
        <Card body className="bg-info">
          <div className="text-center text-white">
            <h1 className="display-4">{profile.user.name}</h1>
            <p className="lead">
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : `at ${profile.company}.`}
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
