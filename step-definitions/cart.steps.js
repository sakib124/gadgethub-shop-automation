const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const cartData = require('../testData/cartData');
const { URLS, TIMEOUTS } = require('../config/constants');


Given('I have added items to my cart', async function () {
  // Navigate to products page and add items
  await this.page.goto(URLS.PRODUCTS_PAGE);
  for (const product of cartData.defaultCartItems) {
    await this.productsPage.addProductToCart(product);
  }
});

Given('I have added {string} to my cart', async function (productName) {
  await this.page.goto(URLS.PRODUCTS_PAGE);
  await this.productsPage.addProductToCart(productName);
});

Given('I have added {string} items to my cart', async function (count) {
  const itemCount = parseInt(count);
  await this.page.goto(URLS.PRODUCTS_PAGE);
  
  const products = cartData.defaultCartItems.slice(0, itemCount);
  for (const product of products) {
    await this.productsPage.addProductToCart(product);
  }
});

Given('I have added multiple items to my cart', async function () {
  await this.page.goto(URLS.PRODUCTS_PAGE);
  for (const product of cartData.multipleItems) {
    await this.productsPage.addProductToCart(product);
  }
});

Given('I am on the cart page', async function () {
  await this.cartPage.navigateToCart();
  await this.cartPage.waitForCartPage();
});

When('I navigate to the cart page', async function () {
  await this.cartPage.navigateToCart();
});

When('I navigate to any page', async function () {
  // Navigate to products page
  await this.page.goto(URLS.PRODUCTS_PAGE);
});

When('I remove {string} from the cart page', async function (productName) {
  await this.cartPage.removeItem(productName);
  await this.page.waitForTimeout(TIMEOUTS.REMOVAL_ANIMATION); // Wait for removal animation
});

When('I remove all items from the cart', async function () {
  await this.cartPage.removeAllItems();
});

When('I click {string} button on cart page', async function (buttonText) {
  if (buttonText === 'Continue Shopping') {
    await this.cartPage.clickContinueShopping();
  } else if (buttonText === 'Checkout') {
    await this.cartPage.clickCheckout();
  }
});

Then('I should see all items in my cart', async function () {
  for (const product of cartData.defaultCartItems) {
    await this.cartPage.verifyProductInCart(product);
  }
});

Then('I should see the correct prices for each item', async function () {
  for (const item of cartData.itemsWithPrices) {
    await this.cartPage.verifyProductPrice(item.name, item.price);
  }
});

Then('{string} should not be visible in the cart', async function (productName) {
  await this.cartPage.verifyProductNotInCart(productName);
});

Then('{string} should still be visible in the cart', async function (productName) {
  await this.cartPage.verifyProductInCart(productName);
});

Then('the cart should be empty', async function () {
  await this.cartPage.verifyCartIsEmpty();
});


Then('I should be redirected to the checkout information page', async function () {
  await this.checkoutPage.verifyOnCheckoutStep1();
});

Then('the cart icon should display {string} items', async function (expectedCount) {
  const count = await this.productsPage.getCartCount();
  expect(count).toBe(expectedCount);
});

Then('my cart items should still be present', async function () {
  const itemCount = await this.cartPage.getCartItemsCount();
  expect(itemCount).toBeGreaterThan(0);
});
