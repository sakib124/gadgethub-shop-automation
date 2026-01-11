const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { users, invalidCredentials } = require('../testData/loginData');
const { URLS } = require('../config/constants');

test.describe('Gadget Hub Login - Valid Credentials', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with default_user', async ({ page }) => {
    const user = users.default;
    
    await loginPage.login(user.username, user.password);
    
    await page.waitForURL(URLS.PRODUCTS_PAGE);
    await expect(loginPage.productsContainer).toBeVisible();
    await expect(loginPage.logo).toBeVisible();
  });

  test('should login successfully with image_error_user', async ({ page }) => {
    const user = users.problem;
    
    await loginPage.login(user.username, user.password);
    
    await page.waitForURL(URLS.PRODUCTS_PAGE);
    await expect(loginPage.productsContainer).toBeVisible();
  });

  test('should login successfully with delayed_login_user', async ({ page }) => {
    const user = users.delayed;
    
    await loginPage.login(user.username, user.password);
    
    await page.waitForURL(URLS.PRODUCTS_PAGE, { timeout: 10000 });
    await expect(loginPage.productsContainer).toBeVisible();
  });

  test('should login successfully with cart_failure_user', async ({ page }) => {
    const user = users.error;
    
    await loginPage.login(user.username, user.password);
    
    await page.waitForURL(URLS.PRODUCTS_PAGE);
    await expect(loginPage.productsContainer).toBeVisible();
  });
});

test.describe('Gadget Hub Login - Locked Out User', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display error message for locked_out_user', async ({ page }) => {
    const user = users.lockedOut;
    
    await loginPage.login(user.username, user.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(user.expectedError);
    
    expect(loginPage.getCurrentUrl()).toBe(URLS.LOGIN_PAGE);
  });

});

test.describe('Gadget Hub Login - Invalid Credentials', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display error for invalid username', async ({ page }) => {
    const creds = invalidCredentials.invalidUsername;
    
    await loginPage.login(creds.username, creds.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(creds.expectedError);
  });

  test('should display error for invalid password', async ({ page }) => {
    const creds = invalidCredentials.invalidPassword;
    
    await loginPage.login(creds.username, creds.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(creds.expectedError);
  });

  test('should display error when username is empty', async ({ page }) => {
    const creds = invalidCredentials.emptyUsername;
    
    await loginPage.login(creds.username, creds.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(creds.expectedError);
  });

  test('should display error when password is empty', async ({ page }) => {
    const creds = invalidCredentials.emptyPassword;
    
    await loginPage.login(creds.username, creds.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(creds.expectedError);
  });

  test('should display error when both fields are empty', async ({ page }) => {
    const creds = invalidCredentials.bothEmpty;
    
    await loginPage.login(creds.username, creds.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(creds.expectedError);
  });
});

test.describe('Gadget Hub Login - UI Elements', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should verify all login page elements are present', async ({ page }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    
    await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
    await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('should verify login button has correct text', async ({ page }) => {
    await expect(loginPage.loginButton).toHaveText('Login');
  });
});

