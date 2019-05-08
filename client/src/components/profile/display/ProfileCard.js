import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getProfileById } from '../../../actions/profileActions';
import ProfileCreds from './ProfileCreds';

class ProfileCard extends Component {
  componentDidMount() {
    this.props.getProfileById(this.props.id);
  }
  render() {
    const { profile } = this.props;
    if (profile) {
      return (
        <ListGroup className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h3 className="m-0">{profile.user.name}</h3>
            <Link
              to={`/handle/${profile.handle}`}
              className="btn btn-outline-primary"
            >
              Full Profile
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={6}>
                <h4 className="text-info text-center">Information</h4>
                <ListGroup.Item>
                  <p className="mb-1">
                    {profile.status} {profile.company && `@ ${profile.company}`}
                  </p>
                  {profile.location && (
                    <p className="mb-1">Located in {profile.location}.</p>
                  )}
                  <p className="mb-1">
                    Profile created {profile.date.split('T')[0]}
                  </p>
                </ListGroup.Item>
              </Col>
              <Col md={6}>
                <h4 className="text-info text-center">Bio</h4>
                <ListGroup.Item>
                  <p className="mb-1">
                    {profile.bio || `${profile.user.name} does not have a bio`}
                  </p>
                </ListGroup.Item>
              </Col>
              <Col xs={12} className="mt-3">
                {profile.experience.length > 0 ? (
                  <ProfileCreds
                    userId={profile.user._id}
                    experience={profile.experience.slice(0, 1)}
                    education={profile.education.slice(0, 1)}
                  />
                ) : (
                  'no experience listed yet'
                )}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ profiles }) => ({ profile: profiles.profile });
const mapDispatchToProps = { getProfileById };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard);
