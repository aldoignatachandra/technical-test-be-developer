import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('firstName').not().isEmpty().withMessage('First Name Cannot Be Empty'),
        body('lastName').not().isEmpty().withMessage('Last Name Cannot Be Empty'),
        body('email').not().isEmpty().withMessage('Email Cannot Be Empty'),
        body('email').isEmail().withMessage('Wrong Email Format'),
        body('password').not().isEmpty().withMessage('Password Cannot Be Empty'),
        body('confirmPassword').not().isEmpty().withMessage('Confirm Password Cannot Be Empty'),
      ];
    }
    case 'login': {
      return [
        body('email').not().isEmpty().withMessage('Email Cannot Be Empty'),
        body('email').isEmail().withMessage('Wrong Email Format'),
        body('password').not().isEmpty().withMessage('Password Cannot Be Empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
