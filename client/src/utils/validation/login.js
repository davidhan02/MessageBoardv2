import loginFields from '../fields/login';

const validate = formValues => {
  const errors = {};
  loginFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  return errors;
};

export default validate;
