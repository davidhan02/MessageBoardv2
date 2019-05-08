import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class CommentList extends Component {
  render() {
    const { comments } = this.props;

    if (comments.length > 0) {
      return comments.map(({ author, body, created }) => (
        <ListGroup.Item className="ml-3 mr-3" key={created}>
          <small className="text-muted">
            {author.name} on {created.split('T')[0]}
          </small>
          <br />
          <span>{body}</span>
        </ListGroup.Item>
      ));
    }

    return null;
  }
}

export default CommentList;
