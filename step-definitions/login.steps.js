const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const { URLS } = require('../config/constants');

// Given steps
Given('I am on the Gadget Hub login page', async function() {
  this.pageObjects.loginPage = new LoginPage(this.page);
  await this.pageObjects.loginPage.goto();
});

// When steps
When('I login with username {string} and password {string}', async function(username, password) {
  await this.pageObjects.loginPage.login(username, password);
});

When('I see an error message', async function() {
  await expect(this.pageObjects.loginPage.errorMessage).toBeVisible();
});

When('I close the error message', async function() {
  await this.pageObjects.loginPage.closeErrorMessage();
});

// Then steps
Then('I should be redirected to the products page', async function() {
  await this.page.waitForURL('**/pages/products.html');
  // Initialize ProductsPage after successful redirect
  this.pageObjects.productsPage = new ProductsPage(this.page);
});

Then('I should be redirected to the products page within {int} seconds', async function(seconds) {
  await this.page.waitForURL('**/pages/products.html', { timeout: seconds * 1000 });
  // Initialize ProductsPage after successful redirect
  this.pageObjects.productsPage = new ProductsPage(this.page);
});

Then('I should see the Gadget Hub logo', async function() {
  await expect(this.pageObjects.loginPage.logo).toBeVisible();
});

Then('I should see the products container', async function() {
  await expect(this.pageObjects.loginPage.productsContainer).toBeVisible();
});

Then('I should see an error message {string}', async function(errorMessage) {
  await expect(this.pageObjects.loginPage.errorMessage).toBeVisible();
  const errorText = await this.pageObjects.loginPage.getErrorMessage();
  expect(errorText).toContain(errorMessage);
});

Then('I should see an error message containing {string}', async function(partialMessage) {
  await expect(this.pageObjects.loginPage.errorMessage).toBeVisible();
  const errorText = await this.pageObjects.loginPage.getErrorMessage();
  expect(errorText).toContain(partialMessage);
});

Then('I should remain on the login page', async function() {
  const currentUrl = this.pageObjects.loginPage.getCurrentUrl();
  expect(currentUrl).toBe(URLS.LOGIN_PAGE);
});

Then('the error message should not be visible', async function() {
  await expect(this.pageObjects.loginPage.errorMessage).not.toBeVisible();
});

Then('the username input should be visible', async function() {
  await expect(this.pageObjects.loginPage.usernameInput).toBeVisible();
});

Then('the password input should be visible', async function() {
  await expect(this.pageObjects.loginPage.passwordInput).toBeVisible();
});

Then('the login button should be visible', async function() {
  await expect(this.pageObjects.loginPage.loginButton).toBeVisible();
});

Then('the username input should have placeholder {string}', async function(placeholder) {
  await expect(this.pageObjects.loginPage.usernameInput).toHaveAttribute('placeholder', placeholder);
});

Then('the password input should have placeholder {string}', async function(placeholder) {
  await expect(this.pageObjects.loginPage.passwordInput).toHaveAttribute('placeholder', placeholder);
});

Then('the login button should have value {string}', async function(value) {
  await expect(this.pageObjects.loginPage.loginButton).toHaveText(value);
});
