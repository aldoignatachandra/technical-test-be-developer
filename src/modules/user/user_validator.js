import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'update': {
      return [
        body('firstName').not().isEmpty().withMessage('First Name Cannot Be Empty'),
        body('lastName').not().isEmpty().withMessage('Last Name Cannot Be Empty'),
        body('telephone').not().isEmpty().withMessage('Telephone Cannot Be Empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
