const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { URLS } = require('../config/constants');

// Initialize the products page
Given('I am on the products page', async function() {
  // Page object is auto-initialized via getter
});

// When steps
When('I add {string} to the cart', async function(productName) {
  await this.productsPage.addProductToCart(productName);
});

When('I remove {string} from the cart on products page', async function(productName) {
  await this.productsPage.removeProductFromCart(productName);
});

When('I click on the cart icon', async function() {
  await this.productsPage.clickCartIcon();
});

When('I click on the hamburger menu', async function() {
  await this.productsPage.clickHamburgerMenu();
});

When('I sort products by {string}', async function(sortOption) {
  await this.productsPage.sortProducts(sortOption);
});

When('I add all products to the cart', async function() {
  await this.productsPage.addAllProductsToCart();
});

When('I navigate back to the products page', async function() {
  await this.productsPage.navigateBack();
});

When('I logout from the products page', async function() {
  await this.productsPage.clickLogout();
});

When('I click on the clear cart link', async function() {
  await this.productsPage.clickClearCart();
});

// Then steps
Then('I should see the products page title {string}', async function(title) {
  await expect(this.productsPage.pageTitle).toBeVisible();
  await expect(this.productsPage.pageTitle).toHaveText(title);
});

Then('I should see the cart icon', async function() {
  await expect(this.productsPage.cartIcon).toBeVisible();
});

Then('I should see the hamburger menu icon', async function() {
  await expect(this.productsPage.hamburgerMenu).toBeVisible();
});

Then('the cart count should be {string}', async function(expectedCount) {
  const actualCount = await this.productsPage.getCartCount();
  expect(actualCount).toBe(expectedCount);
});

Then('I should see at least {int} product cards', async function(minCount) {
  const productCount = await this.productsPage.getProductCount();
  expect(productCount).toBeGreaterThanOrEqual(minCount);
});

Then('each product card should have a product image', async function() {
  const hasAllImages = await this.productsPage.allCardsHaveImages();
  expect(hasAllImages).toBe(true);
});

Then('each product card should have a product name', async function() {
  const hasAllNames = await this.productsPage.allCardsHaveNames();
  expect(hasAllNames).toBe(true);
});

Then('each product card should have a product description', async function() {
  const hasAllDescriptions = await this.productsPage.allCardsHaveDescriptions();
  expect(hasAllDescriptions).toBe(true);
});

Then('each product card should have a product price', async function() {
  const hasAllPrices = await this.productsPage.allCardsHavePrices();
  expect(hasAllPrices).toBe(true);
});

Then('the button for {string} should change to {string}', async function(productName, expectedButtonText) {
  const actualButtonText = await this.productsPage.getProductButtonText(productName);
  expect(actualButtonText.trim()).toBe(expectedButtonText);
});

Then('I should see the sort dropdown', async function() {
  await expect(this.productsPage.sortDropdown).toBeVisible();
});

Then('the sort dropdown should have option {string}', async function(option) {
  const hasOption = await this.productsPage.sortDropdownHasOption(option);
  expect(hasOption).toBe(true);
});

Then('the products should be sorted alphabetically ascending', async function() {
  const isSorted = await this.productsPage.isProductsSortedAlphabetically(true);
  expect(isSorted).toBe(true);
});

Then('the products should be sorted alphabetically descending', async function() {
  const isSorted = await this.productsPage.isProductsSortedAlphabetically(false);
  expect(isSorted).toBe(true);
});

Then('the products should be sorted by price ascending', async function() {
  const isSorted = await this.productsPage.isProductsSortedByPrice(true);
  expect(isSorted).toBe(true);
});

Then('the products should be sorted by price descending', async function() {
  const isSorted = await this.productsPage.isProductsSortedByPrice(false);
  expect(isSorted).toBe(true);
});

Then('I should be redirected to the cart page', async function() {
  await this.page.waitForURL(URLS.CART_PAGE);
});

Then('the product {string} should have price {string}', async function(productName, expectedPrice) {
  const actualPrice = await this.productsPage.getProductPrice(productName);
  expect(actualPrice.trim()).toBe(expectedPrice);
});

Then('the sidebar menu should be visible', async function() {
  await expect(this.productsPage.sidebar).toBeVisible();
});

Then('the sidebar should have {string} link', async function(linkText) {
  const link = this.productsPage.page.locator(`a:has-text("${linkText}")`);
  await expect(link).toBeVisible();
});

Then('all product buttons should show {string}', async function(buttonText) {
  const allMatch = await this.productsPage.allButtonsShowText(buttonText);
  expect(allMatch).toBe(true);
});

Then('the cart count should match the total number of products', async function() {
  const productCount = await this.productsPage.getProductCount();
  const cartCount = await this.productsPage.getCartCount();
  expect(cartCount).toBe(productCount.toString());
});

Then('all product images should be loaded', async function() {
  const allLoaded = await this.productsPage.areAllImagesLoaded();
  expect(allLoaded).toBe(true);
});

Then('no product should have a broken image', async function() {
  const allLoaded = await this.productsPage.areAllImagesLoaded();
  expect(allLoaded).toBe(true);
});

Then('the product {string} should have incorrect image', async function(productName) {
  const hasIncorrectImage = await this.productsPage.productHasIncorrectImage(productName);
  expect(hasIncorrectImage).toBe(true);
});
