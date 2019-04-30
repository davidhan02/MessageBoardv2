import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CreateProfile from './CreateProfile';
import ProfileButtons from '../../dashboard/ProfileButtons';

export default function EditProfile() {
  return (
    <Fragment>
      <Row className="dashboard">
        <Col lg={12} className="text-center">
          <h1 className="display-4">Edit Profile</h1>
          <div className="m-3">
            <ProfileButtons />
          </div>
        </Col>
      </Row>
      <CreateProfile />
    </Fragment>
  );
}
