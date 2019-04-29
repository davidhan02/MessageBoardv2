import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { clearErrors } from '../../actions/authActions';
import { postExperience } from '../../actions/profileActions';
import FormField from '../common/fields/FormField';

class PostExperience extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <Row>
        <Col md={8} className="m-auto">
          <h1 className="display-4 text-center">Add Experience</h1>
          <p className="lead text-center">Add prior work experience here: </p>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            {this.renderFields()}
            <Button variant="primary" size="lg" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

PostExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  postExperience: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

const formWrap = reduxForm({
  validate,
  form: 'expForm'
})(PostExperience);

export default connect(
  mapStateToProps,
  { postExperience, clearErrors }
)(withRouter(formWrap));
