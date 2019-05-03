import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import socialList from '../../utils/fields/social';

const InfoCol = ({ profile }) => {
  let websiteLink = null;
  const firstName = profile.user.name.trim().split(' ')[0];

  if (profile.website) {
    websiteLink = (
      <a
        href={profile.website}
        className="text-info p-2"
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
          className="text-info p-2"
          rel="noopener noreferrer"
        >
          <i className={`${icon} fa-2x`} />
        </a>
      );
    });

  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="lead">
        {firstName}'s Information:
      </ListGroup.Item>
      <ListGroup.Item>
        {profile.status} {profile.company && `@ ${profile.company}`}
      </ListGroup.Item>
      {profile.location && (
        <ListGroup.Item>Located in {profile.location}</ListGroup.Item>
      )}
      <ListGroup.Item>
        "{profile.bio || `${firstName} does not have a bio`}"
      </ListGroup.Item>
      {websiteLink && socialLinks && (
        <ListGroup.Item>
          Links:
          {websiteLink}
          {socialLinks}
        </ListGroup.Item>
      )}
      <ListGroup.Item className="text-center">
        <Link
          className="btn btn-outline-primary btn-block"
          to={`/handle/${profile.handle}`}
        >
          View Full Profile
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default InfoCol;
