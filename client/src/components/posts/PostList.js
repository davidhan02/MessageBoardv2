import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { getPosts, getPostsByUser } from '../../actions/postActions';
import Spinner from '../common/spinner/Spinner';

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts() {
    const {
      posts: { postList, postLoading }
    } = this.props;
    if (postList === null || postLoading) {
      return <Spinner />;
    }
    if (postList)
      return postList.map(post => (
        <ListGroup.Item key={post.id}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="m-0">{post.title}</h5>
            <span>
              <small>Posted to </small>
              <Badge variant="primary">{post.category}</Badge>
              <small> on {post.created.split('T')[0]}</small>
            </span>
          </div>
          <hr />
          {post.url && <small>{post.url}</small>}
          <p className="mt-1 mb-1">{post.text}</p>
          <small>{post.comments.length} Comments</small>
        </ListGroup.Item>
      ));
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
