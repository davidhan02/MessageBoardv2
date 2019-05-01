import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import socialList from '../../../utils/fields/social';

const ProfileHeader = ({ profile }) => {
  let websiteLink = null;
  if (profile.website) {
    websiteLink = (
      <a
        href={profile.website}
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-globe fa-2x" />
      </a>
    );
  }

  const socialLinks = socialList
    .filter(({ name }) => profile.social[name])
    .map(({ name, icon }) => {
      return (
        <a
          key={name}
          target="_blank"
          href={profile.social[name]}
          className="text-white p-2"
          rel="noopener noreferrer"
        >
          <i className={`${icon} fa-2x`} />
        </a>
      );
    });

  return (
    <Row>
      <Col md={12}>
        <Card body className="bg-info">
          <div className="text-center text-white">
            <h1 className="display-4">{profile.user.name}</h1>
            <p className="lead">
              {profile.status} {profile.company && `at ${profile.company}.`}
            </p>
            {profile.location && <p>Located in {profile.location}</p>}
            {websiteLink}
            {socialLinks}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
