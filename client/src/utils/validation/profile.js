import profileFields from '../fields/profile';
import socialFields from '../fields/social';

const validate = formValues => {
  const errors = {};
  const miscFields = ['status', 'bio'];

  profileFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  socialFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  miscFields.forEach(name => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default validate;
