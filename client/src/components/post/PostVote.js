import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PostVote extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="d-flex flex-column text-center justify-content-between ml-2">
        <Button
          variant="outline-primary"
          onClick={() =>
            this.props.submitVote(post.id, 'upvote', this.props.history)
          }
        >
          Like
        </Button>
        <span className="m-2">{post.score}</span>
        <Button
          variant="outline-secondary"
          onClick={() => this.props.submitVote(post.id, 'unvote')}
        >
          DisLike
        </Button>
      </div>
    );
  }
}

export default PostVote;
