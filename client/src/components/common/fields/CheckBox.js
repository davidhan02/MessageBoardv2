import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({ input, label, toggle, meta: { error, touched } }) => {
  return (
    <Form.Group>
      <Form.Check
        label={label}
        {...input}
        onClick={toggle}
        checked={input.value}
      />
      {touched && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
};
