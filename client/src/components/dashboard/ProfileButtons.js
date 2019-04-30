import React from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ProfileButtons = () => {
  return (
    <ButtonGroup>
      <Link to="/dashboard" className="btn btn-outline-info">
        <i className="fas fa-home text-info mr-2" />
        Dashboard
      </Link>
      <Link to="/edit-prof" className="btn btn-outline-info">
        <i className="fas fa-user-circle text-info mr-2" />
        Edit Profile
      </Link>
      <Link to="/add-exp" className="btn btn-outline-info">
        <i className="fab fa-black-tie text-info mr-2" />
        Add Experience
      </Link>
      <Link to="/add-edu" className="btn btn-outline-info">
        <i className="fas fa-graduation-cap text-info mr-2" />
        Add Education
      </Link>
    </ButtonGroup>
  );
};

export default ProfileButtons;
