import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById, updateUser } from './user_repository';

// Get Detail User
const user = async (req, res) => {
  try {
    const { userId } = req.app.locals;

    const user = await findUserById(userId);

    // Check User Already Exist In Database Or Not
    if (!user) {
      return ResponseHelper(res, 404, 'User Not Found', [
        { message: 'User Not Found', param: 'id' },
      ]);
    }

    delete user.password;

    return ResponseHelper(res, 200, 'Success Get Details User', user);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Get Details User', error.message);
  }
};

// Update Data User
const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { id } = req.params;
    const { userId } = req.app.locals;
    const { firstName, lastName, telephone } = req.body;

    const user = await findUserById(id);

    // Check User Already Exist In Database Or Not
    if (!user) {
      return ResponseHelper(res, 404, 'User Not Found', [
        { message: 'User Not Found', param: 'id' },
      ]);
    }

    // Can Only Update ( firstName, lastName, telephone )
    await updateUser(
      { firstName, lastName, telephone, updatedBy: user.email },
      { where: { id: userId } }
    );

    const result = await findUserById(userId);

    delete result.password;

    return ResponseHelper(res, 201, 'Success Edit User', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Edit User', error.message);
  }
};

export { user, update };
