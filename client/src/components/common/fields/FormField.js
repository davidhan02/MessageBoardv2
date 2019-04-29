import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
  input,
  type,
  info,
  label,
  errors,
  disabled,
  controlId,
  meta: { error, touched }
}) => {
  const renderErrors = () => {
    if (errors[controlId]) {
      return errors[controlId];
    } else if (touched) {
      return error;
    }
  };

  return (
    <Form.Group controlId={`my-${controlId}`}>
      <Form.Label>{`${label}: `}</Form.Label>
      <Form.Control
        type={type}
        placeholder={label}
        disabled={disabled}
        {...input}
      />
      {info && <Form.Text className="text-muted">{info}</Form.Text>}
      {(errors[controlId] || touched) && (
        <Form.Text className="text-danger">{renderErrors()}</Form.Text>
      )}
    </Form.Group>
  );
};
