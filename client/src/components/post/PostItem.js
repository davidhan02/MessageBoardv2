import React from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import PostVote from './PostVote';
import PostContent from './PostContent';

const PostItem = ({ post }) => {
  return (
    <ListGroup.Item>
      <Row>
        <PostVote post={post} />
        <PostContent post={post} />
      </Row>
    </ListGroup.Item>
  );
};

export default PostItem;
