import React, { Fragment } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';

const Profile = ({ profile }) => {
  const { user, experience, education } = profile;
  return (
    <Fragment>
      <ProfileHeader profile={profile} />
      <ProfileAbout profile={profile} />
      <ProfileCreds
        userId={user._id}
        experience={experience}
        education={education}
      />
    </Fragment>
  );
};

export default Profile;
