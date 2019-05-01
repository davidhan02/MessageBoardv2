import React, { Component, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../../common/spinner/Spinner';
import * as authActions from '../../../actions/authActions';

class ShowProfile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { profile, loading } = nextProps.profiles;
    if (profile === null && loading) {
      this.props.history.push('/not-found');
    }
  }

  renderContent() {
    const { profile, loading } = this.props.profiles;
    if (profile === null || loading) {
      return <Spinner />;
    } else {
      return <Profile profile={profile} />;
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col lg={12} className="text-center">
            <h1 className="display-4">Profile Display</h1>
            <p className="lead">This is a profile test</p>
          </Col>
        </Row>
        {this.renderContent()}
      </Fragment>
    );
  }
}

ShowProfile.propTypes = {
  profile: PropTypes.object,
  getProfileByHandle: PropTypes.func.isRequired
};

mapStateToProps = ({ profile }) => ({ profile });

export default connect(
  mapStateToProps,
  authActions
)(ShowProfile);
