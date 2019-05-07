import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import AreaField from '../common/fields/AreaField';
import { submitComment } from '../../actions/postActions';

class CommentForm extends Component {
  onSubmit = comment => this.props.submitComment(comment, this.props.id);

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="comment"
          label="Comment"
          controlId="comment"
          component={AreaField}
        />
        <Button type="submit">Submit Comment</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = { submitComment };

const enhance = compose(
  reduxForm({ form: 'commentForm' }),
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhance(CommentForm);
