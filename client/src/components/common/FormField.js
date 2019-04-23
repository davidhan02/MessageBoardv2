import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
  input,
  type,
  label,
  placeholder,
  meta: { error, touched }
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}: </Form.Label>
      <Form.Control type={type} placeholder={placeholder} {...input} />
      <Form.Text>{touched && error}</Form.Text>
    </Form.Group>
  );
};
