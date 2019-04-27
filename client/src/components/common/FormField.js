import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
  input,
  type,
  info,
  label,
  errors,
  placeholder,
  meta: { error, touched }
}) => {
  const renderErrors = () => {
    if (errors[type]) {
      return errors[type];
    }
    if (touched) {
      return error;
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}: </Form.Label>
      <Form.Control type={type} placeholder={placeholder} {...input} />
      {info && <Form.Text className="text-muted">{info}</Form.Text>}
      <Form.Text>{renderErrors()}</Form.Text>
    </Form.Group>
  );
};
