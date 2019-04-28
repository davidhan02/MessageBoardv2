import React from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ProfileActions = () => {
  return (
    <ButtonGroup>
      <Link to="/edit-profile" className="btn btn-outline-info">
        <i className="fas fa-user-circle text-info mr-2" />
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-outline-info">
        <i className="fab fa-black-tie text-info mr-2" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-outline-info">
        <i className="fas fa-graduation-cap text-info mr-2" />
        Add Education
      </Link>
    </ButtonGroup>
  );
};

export default ProfileActions;
