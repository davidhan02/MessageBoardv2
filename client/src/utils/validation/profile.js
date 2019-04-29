const validate = formValues => {
  const errors = {};
  const requiredFields = ['handle', 'interests'];

  requiredFields.forEach(name => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  // eslint-disable-next-line
  if (formValues.status == 0) {
    errors.status = 'You must provide a status';
  }

  return errors;
};

export default validate;
