import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CreateProfile from './CreateProfile';
import ProfileButtons from './ProfileButtons';
import { deleteAccount } from '../../actions/profileActions';
import isEmpty from '../../utils/is-empty';

class DashboardProfile extends Component {
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { profile } = this.props.profiles;
    return (
      <Fragment>
        <Row className="mt-3">
          <Col lg={8} className="text-center m-auto">
            {!isEmpty(profile) && <ProfileButtons />}
            <p className="text-left lead mt-3">
              {!isEmpty(profile)
                ? 'Edit your profile information here: '
                : 'A profile is optional, you can create one here: '}
            </p>
          </Col>
        </Row>
        <CreateProfile />
        <Row>
          <Col className="m-3 text-center">
            <Button variant="danger" onClick={this.onDeleteClick}>
              Delete my Account
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ profiles }) => ({ profiles });

export default connect(
  mapStateToProps,
  { deleteAccount }
)(DashboardProfile);
