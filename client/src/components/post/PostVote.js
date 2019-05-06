import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { submitVote } from '../../actions/postActions';

class PostVote extends Component {
  constructor(props) {
    super(props);
    const didVote = PostVote.existingVote(props);
    this.state = {
      score: props.score,
      didVote,
      didUpvote: didVote === 1,
      didDownvote: didVote === -1
    };
  }

  static existingVote = ({ user, votes }) => {
    const existingVote =
      user && votes && votes.find(vote => vote.user === user.id);
    return existingVote ? existingVote.vote : 0;
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.score !== nextProps.score) {
      const didVote = PostVote.existingVote(nextProps);
      this.setState({
        score: nextProps.score,
        didVote,
        didUpvote: didVote === 1,
        didDownvote: didVote === -1
      });
    } else if (
      this.props.user.id !== nextProps.user.id &&
      !nextProps.isAuthenticated
    ) {
      this.setState({
        didVote: false,
        didUpvote: false,
        didDownvote: false
      });
    }
  }

  castVote = vote => {
    const { submitVote, id, isAuthenticated } = this.props;
    if (isAuthenticated) {
      submitVote(id, vote);
      this.setState({
        score: this.state.score + vote - this.state.didVote,
        didVote: vote,
        didUpvote: vote === 1,
        didDownvote: vote === -1
      });
    }
  };

  upvote = () => this.castVote(this.state.didUpvote ? 0 : 1);

  downvote = () => this.castVote(this.state.didDownvote ? 0 : -1);

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="d-flex flex-column text-center ml-2">
        <Button
          variant={this.state.didUpvote ? 'primary' : 'outline-primary'}
          onClick={this.upvote}
          disabled={!isAuthenticated}
        >
          <i className="fas fa-arrow-up" />
        </Button>
        <span className="m-2">{this.state.score}</span>
        <Button
          variant={this.state.didDownvote ? 'secondary' : 'outline-secondary'}
          onClick={this.downvote}
          disabled={!isAuthenticated}
        >
          <i className="fas fa-arrow-down" />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { submitVote }
)(PostVote);
