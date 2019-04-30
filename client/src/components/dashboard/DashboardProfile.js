import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CreateProfile from '../profile/edit/CreateProfile';
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
        <Row className="dashboard-profile">
          <Col lg={12} className="text-center">
            <div className="m-3">{!isEmpty(profile) && <ProfileButtons />}</div>
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
