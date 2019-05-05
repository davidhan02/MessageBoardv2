const validate = formValues => {
  const errors = {};
  const requiredFields = ['title', 'category', 'text'];

  requiredFields.forEach(name => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  // eslint-disable-next-line
  if (formValues.category == 0) {
    errors.category = 'You must provide a category';
  }

  return errors;
};

export default validate;
