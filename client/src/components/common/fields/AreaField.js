import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
  input,
  info,
  label,
  controlId,
  meta: { error, touched }
}) => {
  return (
    <Form.Group controlId={`my-${controlId}`}>
      <Form.Label>{`${label}: `}</Form.Label>
      <Form.Control as="textarea" rows="3" placeholder={label} {...input} />
      {info && <Form.Text className="text-muted">{info}</Form.Text>}
      {touched && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
};
