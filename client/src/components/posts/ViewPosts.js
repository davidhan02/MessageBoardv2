import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  getPosts,
  getPostsByUser,
  getPostsByCat
} from '../../actions/postActions';
import ProfileCard from '../profile/display/ProfileCard';
import Spinner from '../common/spinner/Spinner';
import PostItem from '../post/PostItem';
import CategoryMenu from '../categories/CategoryMenu';

class PostList extends Component {
  componentDidMount() {
    const { userId, category } = this.props.match.params;
    if (userId) return this.props.getPostsByUser(userId);
    if (category) return this.props.getPostsByCat(category);
    this.props.getPosts();
  }

  render() {
    const { userId, category } = this.props.match.params;
    const { postList, postLoading } = this.props.posts;
    if (postList === null || postLoading) {
      return <Spinner />;
    }
    if (postList.length > 0) {
      return (
        <>
          {userId ? (
            <ProfileCard id={userId} />
          ) : (
            <CategoryMenu category={category || 'all'} />
          )}
          <ListGroup>
            {postList.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </ListGroup>
        </>
      );
    }
    return <h4>There's nothing here...</h4>;
  }
}

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = { getPosts, getPostsByUser, getPostsByCat };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
