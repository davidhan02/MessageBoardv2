import React from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import PostVote from './PostVote';
import PostContent from './PostContent';

const PostItem = ({ post }) => {
  return (
    <ListGroup.Item>
      <Row>
        <PostVote id={post.id} votes={post.votes} score={post.score} />
        <PostContent post={post} />
      </Row>
    </ListGroup.Item>
  );
};

export default PostItem;
