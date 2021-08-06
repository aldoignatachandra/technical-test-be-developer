import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('itemName').not().isEmpty().withMessage('Item Name Cannot Be Empty'),
        body('price').not().isEmpty().withMessage('Item Price Cannot Be Empty'),
        body('type').not().isEmpty().withMessage('Item Type Cannot Be Empty'),
        body('uom').not().isEmpty().withMessage('Item Unit Of Measure Cannot Be Empty'),
        body('qty').not().isEmpty().withMessage('Item Qty Cannot Be Empty'),
        body('description').not().isEmpty().withMessage('Item Description Cannot Be Empty'),
      ];
    }
    case 'update': {
      return [
        body('itemName').not().isEmpty().withMessage('Item Name Cannot Be Empty'),
        body('price').not().isEmpty().withMessage('Item Price Cannot Be Empty'),
        body('type').not().isEmpty().withMessage('Item Type Cannot Be Empty'),
        body('uom').not().isEmpty().withMessage('Item Unit Of Measure Cannot Be Empty'),
        body('qty').not().isEmpty().withMessage('Item Qty Cannot Be Empty'),
        body('description').not().isEmpty().withMessage('Item Description Cannot Be Empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
