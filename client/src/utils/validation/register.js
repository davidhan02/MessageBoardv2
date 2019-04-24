import registerFields from '../fields/register';

const validate = formValues => {
  const errors = {};
  registerFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  const { password, password2 } = formValues;
  if (password !== password2) {
    errors.password2 = 'Passwords do not match';
  }
  return errors;
};

export default validate;
