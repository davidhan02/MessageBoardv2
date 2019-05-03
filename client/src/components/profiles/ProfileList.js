import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProfileItem from './ProfileItem';
import Spinner from '../common/spinner/Spinner';
import { getProfiles } from '../../actions/profileActions';

class ProfileList extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profiles;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = <h1>Display profiles here...</h1>;
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <Row>
        <Col md={12}>
          <h1 className="display-4 text-center">User Profiles</h1>
          <p className="lead text-center">
            Browse and connect with other users
          </p>
          {profileItems}
        </Col>
      </Row>
    );
  }
}

ProfileList.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = ({ profiles }) => ({ profiles });

export default connect(
  mapStateToProps,
  { getProfiles }
)(ProfileList);
