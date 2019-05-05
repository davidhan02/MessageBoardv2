import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import * as postActions from '../../actions/postActions';
import validate from '../../utils/validation/post';
import categories from '../../utils/fields/categories';
import SelectField from '../common/fields/SelectField';
import FormField from '../common/fields/FormField';
import AreaField from '../common/fields/AreaField';

class PostForm extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    const { submitPost, history } = this.props;
    submitPost(formValues, history);
  };

  render() {
    const { handleSubmit, errors } = this.props;
    return (
      <Row>
        <Col lg={8} className="m-auto">
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="category"
              label="Category"
              controlId="category"
              component={SelectField}
              options={categories}
            />
            <Field
              type="text"
              name="title"
              label="Post Title"
              controlId="title"
              errors={errors}
              component={FormField}
            />
            <Field
              type="url"
              name="url"
              label="Optional Link"
              controlId="link"
              errors={errors}
              component={FormField}
            />
            <Field
              name="text"
              label="Post Body"
              controlId="text"
              component={AreaField}
            />
            <Button variant="primary" type="submit" block>
              Submit Post
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ errors }) => ({ errors });

const formWrap = reduxForm({
  validate,
  form: 'postForm'
})(PostForm);

export default connect(
  mapStateToProps,
  postActions
)(withRouter(formWrap));
