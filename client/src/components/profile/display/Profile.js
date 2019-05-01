import React, { Fragment } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';

const Profile = ({ profile }) => {
  const { experience, education } = profile;
  return (
    <Fragment>
      <ProfileHeader profile={profile} />
      <ProfileAbout profile={profile} />
      <ProfileCreds experience={experience} education={education} />
    </Fragment>
  );
};

export default Profile;
