/**
 * Test data for Gadget Hub login scenarios
 * Uses centralized credentials from constants
 */

const { CREDENTIALS, ERROR_MESSAGES } = require('../config/constants');

const users = {
  default: {
    username: CREDENTIALS.USERS.DEFAULT,
    password: CREDENTIALS.VALID_PASSWORD,
    expectedBehavior: 'Should login successfully',
    shouldSucceed: true
  },
  
  lockedOut: {
    username: CREDENTIALS.USERS.LOCKED_OUT,
    password: CREDENTIALS.VALID_PASSWORD,
    expectedBehavior: 'Should show error: user has been locked out',
    shouldSucceed: false,
    expectedError: ERROR_MESSAGES.LOGIN.LOCKED_OUT
  },
  
  problem: {
    username: CREDENTIALS.USERS.IMAGE_ERROR,
    password: CREDENTIALS.VALID_PASSWORD,
    expectedBehavior: 'Should login but may have issues with product images',
    shouldSucceed: true
  },
  
  delayed: {
    username: CREDENTIALS.USERS.DELAYED_LOGIN,
    password: CREDENTIALS.VALID_PASSWORD,
    expectedBehavior: 'Should login successfully but with delay',
    shouldSucceed: true
  },
  
  error: {
    username: CREDENTIALS.USERS.CART_FAILURE,
    password: CREDENTIALS.VALID_PASSWORD,
    expectedBehavior: 'Should login but may encounter errors on other pages',
    shouldSucceed: true
  }
  
};

const invalidCredentials = {
  invalidUsername: {
    username: 'invalid_user',
    password: CREDENTIALS.VALID_PASSWORD,
    expectedError: ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS
  },
  
  invalidPassword: {
    username: CREDENTIALS.USERS.DEFAULT,
    password: 'wrong_password',
    expectedError: ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS
  },
  
  emptyUsername: {
    username: '',
    password: CREDENTIALS.VALID_PASSWORD,
    expectedError: ERROR_MESSAGES.LOGIN.USERNAME_REQUIRED
  },
  
  emptyPassword: {
    username: CREDENTIALS.USERS.DEFAULT,
    password: '',
    expectedError: ERROR_MESSAGES.LOGIN.PASSWORD_REQUIRED
  },
  
  bothEmpty: {
    username: '',
    password: '',
    expectedError: ERROR_MESSAGES.LOGIN.USERNAME_REQUIRED
  }
};

module.exports = {
  users,
  invalidCredentials,
  VALID_PASSWORD: CREDENTIALS.VALID_PASSWORD
};
