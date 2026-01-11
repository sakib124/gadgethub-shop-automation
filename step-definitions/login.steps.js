const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { URLS, CREDENTIALS } = require('../config/constants');

// Given steps
Given('I am on the Gadget Hub login page', async function() {
  await this.loginPage.goto();
});

Given('I am logged in as a valid user', async function() {
  await this.loginPage.goto();
  await this.loginPage.login(CREDENTIALS.USERS.DEFAULT, CREDENTIALS.VALID_PASSWORD);
  await this.page.waitForURL(URLS.PRODUCTS_PAGE);
});

// When steps
When('I login with username {string} and password {string}', async function(username, password) {
  await this.loginPage.login(username, password);
});

When('I see an error message', async function() {
  await expect(this.loginPage.errorMessage).toBeVisible();
});

When('I close the error message', async function() {
  await this.loginPage.closeErrorMessage();
});

// Then steps
Then('I should be redirected to the products page', async function() {
  await this.page.waitForURL(URLS.PRODUCTS_PAGE);
});

Then('I should be redirected to the products page within {int} seconds', async function(seconds) {
  await this.page.waitForURL(URLS.PRODUCTS_PAGE, { timeout: seconds * 1000 });
});

Then('I should see the Gadget Hub logo', async function() {
  await expect(this.loginPage.logo).toBeVisible();
});

Then('I should see the products container', async function() {
  await expect(this.loginPage.productsContainer).toBeVisible();
});

Then('I should see an error message {string}', async function(errorMessage) {
  await expect(this.loginPage.errorMessage).toBeVisible();
  const errorText = await this.loginPage.getErrorMessage();
  expect(errorText).toContain(errorMessage);
});

Then('I should see an error message containing {string}', async function(partialMessage) {
  await expect(this.loginPage.errorMessage).toBeVisible();
  const errorText = await this.loginPage.getErrorMessage();
  expect(errorText).toContain(partialMessage);
});

Then('I should remain on the login page', async function() {
  const currentUrl = this.loginPage.getCurrentUrl();
  expect(currentUrl).toBe(URLS.LOGIN_PAGE);
});

Then('the error message should not be visible', async function() {
  await expect(this.loginPage.errorMessage).not.toBeVisible();
});

Then('the username input should be visible', async function() {
  await expect(this.loginPage.usernameInput).toBeVisible();
});

Then('the password input should be visible', async function() {
  await expect(this.loginPage.passwordInput).toBeVisible();
});

Then('the login button should be visible', async function() {
  await expect(this.loginPage.loginButton).toBeVisible();
});

Then('the username input should have placeholder {string}', async function(placeholder) {
  await expect(this.loginPage.usernameInput).toHaveAttribute('placeholder', placeholder);
});

Then('the password input should have placeholder {string}', async function(placeholder) {
  await expect(this.loginPage.passwordInput).toHaveAttribute('placeholder', placeholder);
});

Then('the login button should have value {string}', async function(value) {
  await expect(this.loginPage.loginButton).toHaveText(value);
});
