import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

import PostItem from './PostItem';
import Spinner from '../common/spinner/Spinner';
import { getPost } from '../../actions/postActions';
import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';

class ViewPost extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId) this.props.getPost(postId);
  }

  render() {
    const { post, postLoading } = this.props.posts;
    if (post === null || postLoading) {
      return <Spinner />;
    }
    return (
      <div>
        <h1>ViewPost</h1>
        <ListGroup>
          <PostItem post={post} />
          <ListGroup.Item className="ml-3 mr-3">
            <CommentForm id={post.id} />
          </ListGroup.Item>
          <CommentList comments={post.comments} />
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = { getPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPost);
