import React, { Fragment } from 'react';
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
    <Fragment>
      <p className="lead">
        {profile.status} {profile.company && `@ ${profile.company}`}
      </p>
      {profile.location && <p>Located in {profile.location}</p>}
      <p>{profile.bio || `${firstName} does not have a bio`}</p>
      <p>
        {websiteLink}
        {socialLinks}
      </p>
    </Fragment>
  );
};

export default InfoCol;
