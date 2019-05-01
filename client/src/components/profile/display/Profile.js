import React, { Fragment } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';

const Profile = ({ profile }) => {
  return (
    <Fragment>
      <ProfileHeader profile={profile} />
    </Fragment>
  );
};

export default Profile;
