import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import { getPosts, getPostsByUser } from '../../actions/postActions';

import Spinner from '../common/spinner/Spinner';
import PostItem from '../post/PostItem';

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts() {
    const { postList, postLoading } = this.props.posts;
    if (postList === null || postLoading) {
      return <Spinner />;
    }
    if (postList)
      return postList.map(post => <PostItem key={post.id} post={post} />);
  }

  render() {
    return (
      <Row>
        <Col>
          <h1>render posts here</h1>
          <ListGroup>{this.renderPosts()}</ListGroup>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = { getPosts, getPostsByUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
