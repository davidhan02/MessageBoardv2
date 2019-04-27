import profileFields from '../fields/profile';

const validate = formValues => {
  const errors = {};
  profileFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  return errors;
};

export default validate;
