import { validationResult } from 'express-validator';
import { generatePassword, generateToken, comparePassword } from '../../helpers/authentication';
import { createUser } from './auth_repository';
import { findOneUser, updateUser } from '../user/user_repository';
import ResponseHelper from '../../helpers/response_helper';

// Register New User
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { email, password, confirmPassword, firstName, lastName, telephone } = req.body;

    // Check User
    let checkUser = await findOneUser({
      where: { email },
      raw: true,
    });
    if (checkUser) {
      return ResponseHelper(res, 409, 'Email Already Registered', [
        { message: 'Email Already Registered', param: 'email' },
      ]);
    }

    // Check Confirm Password
    if (password !== confirmPassword) {
      return ResponseHelper(res, 422, 'Confirm Password Not Same', [
        { message: 'Confirm Password Not Same', param: 'password' },
      ]);
    }

    const passwordHashed = await generatePassword(password);

    const newUser = await createUser({
      email,
      firstName,
      lastName,
      telephone,
      password: passwordHashed,
      role: 'owner',
    });

    await updateUser(
      { createdBy: newUser.email, updatedBy: newUser.email },
      { where: { id: newUser.id } }
    );

    let user = await findOneUser({ where: { id: newUser.id }, raw: true });

    const token = generateToken(user.id);

    delete user.password;

    return ResponseHelper(res, 200, `Success Register New User`, {
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Register New User', error.message);
  }
};

// Login User
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { email, password } = req.body;

    let user = await findOneUser({ where: { email }, raw: true });

    // Check Email
    if (!user) {
      return ResponseHelper(res, 422, 'Email Not Exist In Database', [
        { message: 'Email Not Exist In Database', param: 'email' },
      ]);
    }

    const isMatch = await comparePassword(password, user.password);

    // Check Password
    if (!isMatch) {
      return ResponseHelper(res, 422, 'Wrong Password', [
        { message: 'Wrong Password', param: 'password' },
      ]);
    }

    const token = generateToken(user.id);

    delete user.password;

    return ResponseHelper(res, 200, 'Success Login', { token, user });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Login', error.message);
  }
};

export { register, login };
