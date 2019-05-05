import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PostForm from './PostForm';

const NewPost = () => {
  return (
    <>
      <Row className="dashboard">
        <Col lg={12} className="text-center">
          <h1 className="display-4">Create a Post</h1>
          <p className="lead">Write a brand new post of your own right here:</p>
        </Col>
      </Row>
      <PostForm />
    </>
  );
};

export default NewPost;
