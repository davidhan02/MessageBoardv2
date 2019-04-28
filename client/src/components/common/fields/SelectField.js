import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
  input,
  info,
  label,
  options,
  controlId,
  meta: { error, touched }
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <Form.Group controlId={`my-${controlId}`}>
      <Form.Label>{`${label}: `}</Form.Label>
      <Form.Control as="select" {...input}>
        {selectOptions}
      </Form.Control>
      {info && <Form.Text className="text-muted">{info}</Form.Text>}
      {touched && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
};
