import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default ({
  input,
  type,
  icon,
  label,
  controlId,
  placeholder,
  meta: { error, touched }
}) => {
  return (
    <Form.Group controlId={`my-${controlId}`}>
      <Form.Label>{`${label}: `}</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className={icon} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control type={type} placeholder={placeholder} {...input} />
        {touched && <Form.Text className="text-danger">{error}</Form.Text>}
      </InputGroup>
    </Form.Group>
  );
};
