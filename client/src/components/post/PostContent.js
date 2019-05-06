import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const PostContent = ({ post }) => {
  return (
    <Col>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="m-0">{post.title}</h5>
        <span>
          <small>Posted to </small>
          <Badge variant="primary">{post.category}</Badge>
          <small> on {post.created.split('T')[0]}</small>
        </span>
      </div>
      <hr className="mt-2 mb-2" />
      {post.url && <span>{post.url}</span>}
      <p className="mt-1 mb-1">{post.text}</p>
      <Link to={`/comment/${post.id}`}>
        <small>{post.comments.length} Comments</small>
      </Link>
    </Col>
  );
};

export default PostContent;
