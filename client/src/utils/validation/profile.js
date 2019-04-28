import profileFields from '../fields/profile';
import socialFields from '../fields/social';

const validate = formValues => {
  const errors = {};
  const requiredFields = ['status', 'handle', 'interests'];

  requiredFields.forEach(name => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default validate;
