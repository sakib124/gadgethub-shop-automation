const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');

// Initialize the products page
Given('I am on the products page', async function() {
  this.pageObjects.productsPage = new ProductsPage(this.page);
});

// When steps
When('I add {string} to the cart', async function(productName) {
  await this.pageObjects.productsPage.addProductToCart(productName);
});

When('I remove {string} from the cart', async function(productName) {
  await this.pageObjects.productsPage.removeProductFromCart(productName);
});

When('I click on the cart icon', async function() {
  await this.pageObjects.productsPage.clickCartIcon();
});

When('I click on the hamburger menu', async function() {
  await this.pageObjects.productsPage.clickHamburgerMenu();
});

When('I sort products by {string}', async function(sortOption) {
  await this.pageObjects.productsPage.sortProducts(sortOption);
});

When('I add all products to the cart', async function() {
  await this.pageObjects.productsPage.addAllProductsToCart();
});

When('I navigate back to the products page', async function() {
  await this.pageObjects.productsPage.navigateBack();
});

// Then steps
Then('I should see the products page title {string}', async function(title) {
  await expect(this.pageObjects.productsPage.pageTitle).toBeVisible();
  await expect(this.pageObjects.productsPage.pageTitle).toHaveText(title);
});

Then('I should see the cart icon', async function() {
  await expect(this.pageObjects.productsPage.cartIcon).toBeVisible();
});

Then('I should see the hamburger menu icon', async function() {
  await expect(this.pageObjects.productsPage.hamburgerMenu).toBeVisible();
});

Then('the cart count should be {string}', async function(expectedCount) {
  const actualCount = await this.pageObjects.productsPage.getCartCount();
  expect(actualCount).toBe(expectedCount);
});

Then('I should see at least {int} product cards', async function(minCount) {
  const productCount = await this.pageObjects.productsPage.getProductCount();
  expect(productCount).toBeGreaterThanOrEqual(minCount);
});

Then('each product card should have a product image', async function() {
  const hasAllImages = await this.pageObjects.productsPage.allCardsHaveImages();
  expect(hasAllImages).toBe(true);
});

Then('each product card should have a product name', async function() {
  const hasAllNames = await this.pageObjects.productsPage.allCardsHaveNames();
  expect(hasAllNames).toBe(true);
});

Then('each product card should have a product description', async function() {
  const hasAllDescriptions = await this.pageObjects.productsPage.allCardsHaveDescriptions();
  expect(hasAllDescriptions).toBe(true);
});

Then('each product card should have a product price', async function() {
  const hasAllPrices = await this.pageObjects.productsPage.allCardsHavePrices();
  expect(hasAllPrices).toBe(true);
});

Then('each product card should have an {string} button', async function(expectedButtonText) {
  const hasAllButtons = await this.pageObjects.productsPage.allCardsHaveButtons(expectedButtonText);
  expect(hasAllButtons).toBe(true);
});

Then('the button for {string} should change to {string}', async function(productName, expectedButtonText) {
  const actualButtonText = await this.pageObjects.productsPage.getProductButtonText(productName);
  expect(actualButtonText.trim()).toBe(expectedButtonText);
});

Then('I should see the sort dropdown', async function() {
  await expect(this.pageObjects.productsPage.sortDropdown).toBeVisible();
});

Then('the sort dropdown should have option {string}', async function(option) {
  const hasOption = await this.pageObjects.productsPage.sortDropdownHasOption(option);
  expect(hasOption).toBe(true);
});

Then('the products should be sorted alphabetically ascending', async function() {
  const productNames = await this.pageObjects.productsPage.getProductNames();
  const isSorted = this.pageObjects.productsPage.isArraySortedAlphabetically(productNames, true);
  expect(isSorted).toBe(true);
});

Then('the products should be sorted alphabetically descending', async function() {
  const productNames = await this.pageObjects.productsPage.getProductNames();
  const isSorted = this.pageObjects.productsPage.isArraySortedAlphabetically(productNames, false);
  expect(isSorted).toBe(true);
});

Then('the products should be sorted by price ascending', async function() {
  const productPrices = await this.pageObjects.productsPage.getProductPrices();
  const isSorted = this.pageObjects.productsPage.isArraySortedNumerically(productPrices, true);
  expect(isSorted).toBe(true);
});

Then('the products should be sorted by price descending', async function() {
  const productPrices = await this.pageObjects.productsPage.getProductPrices();
  const isSorted = this.pageObjects.productsPage.isArraySortedNumerically(productPrices, false);
  expect(isSorted).toBe(true);
});

Then('I should be redirected to the cart page', async function() {
  await this.page.waitForURL('**/pages/cart.html');
});

Then('the product {string} should have price {string}', async function(productName, expectedPrice) {
  const actualPrice = await this.pageObjects.productsPage.getProductPrice(productName);
  expect(actualPrice.trim()).toBe(expectedPrice);
});

Then('the sidebar menu should be visible', async function() {
  await expect(this.pageObjects.productsPage.sidebar).toBeVisible();
});

Then('the sidebar should have {string} link', async function(linkText) {
  const link = this.pageObjects.productsPage.page.locator(`a:has-text("${linkText}")`);
  await expect(link).toBeVisible();
});

Then('all product buttons should show {string}', async function(buttonText) {
  const allMatch = await this.pageObjects.productsPage.allButtonsShowText(buttonText);
  expect(allMatch).toBe(true);
});

Then('the cart count should match the total number of products', async function() {
  const productCount = await this.pageObjects.productsPage.getProductCount();
  const cartCount = await this.pageObjects.productsPage.getCartCount();
  expect(cartCount).toBe(productCount.toString());
});

Then('all product images should be loaded', async function() {
  const allLoaded = await this.pageObjects.productsPage.areAllImagesLoaded();
  expect(allLoaded).toBe(true);
});

Then('no product should have a broken image', async function() {
  const allLoaded = await this.pageObjects.productsPage.areAllImagesLoaded();
  expect(allLoaded).toBe(true);
});
