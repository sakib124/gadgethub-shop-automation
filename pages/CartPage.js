const { expect } = require('@playwright/test');
const { SELECTORS, URLS, TIMEOUTS } = require('../config/constants');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.cartItems = page.locator(SELECTORS.CART.CART_ITEM);
    this.continueShoppingButton = page.locator(SELECTORS.CART.CONTINUE_SHOPPING_BUTTON);
    this.checkoutButton = page.locator(SELECTORS.CART.CHECKOUT_BUTTON);
    this.pageTitle = page.locator(SELECTORS.CART.PAGE_TITLE);
  }

  // Get specific cart item by product name
  getCartItem(productName) {
    return this.page.locator(SELECTORS.CART.CART_ITEM, { hasText: productName });
  }

  // Get remove button for specific product
  getRemoveButton(productName) {
    return this.getCartItem(productName).locator('button', { hasText: 'Remove' });
  }

  // Get product name element
  getProductName(productName) {
    return this.getCartItem(productName).locator(SELECTORS.CART.CART_ITEM_NAME);
  }

  // Get product price element
  getProductPrice(productName) {
    return this.getCartItem(productName).locator(SELECTORS.CART.CART_ITEM_PRICE);
  }

  // Get product description
  getProductDescription(productName) {
    return this.getCartItem(productName).locator(SELECTORS.CART.CART_ITEM_DESCRIPTION);
  }

  // Navigate to cart page
  async navigateToCart() {
    await this.goto(URLS.CART_PAGE);
  }

  // Get cart items count
  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  // Remove item from cart
  async removeItem(productName) {
    await this.getRemoveButton(productName).click();
  }

  // Remove all items from cart
  async removeAllItems() {
    let removeButton = this.page.locator('button:has-text("Remove")').first();
    while (await removeButton.count() > 0) {
      await removeButton.click();
      await this.page.waitForTimeout(TIMEOUTS.REMOVAL_ANIMATION); // Wait for removal animation
    }
  }

  // Click continue shopping button
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  // Click checkout button
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  // Verify product is in cart
  async verifyProductInCart(productName) {
    await expect(this.getProductName(productName)).toBeVisible();
  }

  // Verify product is not in cart
  async verifyProductNotInCart(productName) {
    await expect(this.getProductName(productName)).not.toBeVisible();
  }

  // Verify product price in cart
  async verifyProductPrice(productName, expectedPrice) {
    await expect(this.getProductPrice(productName)).toHaveText(expectedPrice);
  }

  // Verify cart is empty
  async verifyCartIsEmpty() {
    const count = await this.getCartItemsCount();
    expect(count).toBe(0);
  }

  // Verify page title
  async verifyOnCartPage(title) {
    await expect(this.pageTitle).toHaveText(title);
  }

  // Wait for cart page to load
  async waitForCartPage() {
    await this.page.waitForURL(URLS.CART_PAGE);
  }
}

module.exports = CartPage;
