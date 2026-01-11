const { expect } = require('@playwright/test');
const { SELECTORS, URLS, CHECKOUT } = require('../config/constants');
const cartData = require('../testData/cartData');
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Step 1 - Your Information
    this.firstNameInput = page.locator(SELECTORS.CHECKOUT.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(SELECTORS.CHECKOUT.LAST_NAME_INPUT);
    this.postalCodeInput = page.locator(SELECTORS.CHECKOUT.POSTAL_CODE_INPUT);
    this.cancelButton = page.locator(SELECTORS.CHECKOUT.CANCEL_BUTTON);
    this.continueButton = page.locator(SELECTORS.CHECKOUT.CONTINUE_BUTTON);
    this.errorMessage = page.locator(SELECTORS.CHECKOUT.ERROR_MESSAGE);
    
    // Step 2 - Overview
    this.overviewItems = page.locator(SELECTORS.CHECKOUT.CHECKOUT_ITEM);
    this.itemTotal = page.locator(SELECTORS.CHECKOUT.ITEM_TOTAL);
    this.tax = page.locator(SELECTORS.CHECKOUT.TAX);
    this.total = page.locator(SELECTORS.CHECKOUT.TOTAL);
    this.paymentInfo = page.locator(SELECTORS.CHECKOUT.PAYMENT_INFO);
    this.shippingInfo = page.locator(SELECTORS.CHECKOUT.SHIPPING_INFO);
    this.finishButton = page.locator(SELECTORS.CHECKOUT.FINISH_BUTTON);
    
    // Complete page
    this.completeHeader = page.locator(SELECTORS.CHECKOUT.COMPLETE_HEADER);
    this.completeText = page.locator(SELECTORS.CHECKOUT.COMPLETE_TEXT);
    this.backHomeButton = page.locator(SELECTORS.CHECKOUT.BACK_HOME_BUTTON);
    
    // General
    this.pageTitle = page.locator(SELECTORS.CHECKOUT.PAGE_TITLE);
  }

  // Get cart item on overview page by product name
  getOverviewItem(productName) {
    return this.page.locator(SELECTORS.CHECKOUT.CHECKOUT_ITEM, { hasText: productName });
  }

  // Get product price on overview page
  getOverviewItemPrice(productName) {
    return this.getOverviewItem(productName).locator(SELECTORS.CHECKOUT.CHECKOUT_ITEM_PRICE);
  }

  // Navigate to checkout step 1
  async navigateToCheckoutStep1() {
    await this.goto(URLS.CHECKOUT_STEP1);
  }

  // Fill in checkout information
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Fill checkout information from data object
  async fillCheckoutInfo(data) {
    await this.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
  }

  // Click continue button
  async clickContinueStep1() {
    await this.continueButton.click();
  }

  // Click cancel button
  async clickCancelStep1() {
    await this.cancelButton.click();
  }

  // Click cancel button (same for both steps)
  async clickCancelStep2() {
    await this.cancelButton.click();
  }

  // Click finish button
  async clickFinish() {
    await this.finishButton.click();
  }

  // Click back home button
  async clickBackHome() {
    await this.backHomeButton.click();
  }

  // Verify we're on checkout step 1
  async verifyOnCheckoutStep1() {
    await this.page.waitForURL(URLS.CHECKOUT_STEP1);
  }

  // Verify we're on checkout overview page
  async verifyOnCheckoutOverview() {
    await this.page.waitForURL(URLS.CHECKOUT_STEP2);
  }

  // Verify we're on order confirmation page
  async verifyOnOrderConfirmation() {
    await this.page.waitForURL(URLS.CHECKOUT_COMPLETE);
  }

  // Verify confirmation message
  async verifyConfirmationMessage(message) {
    await expect(this.completeHeader).toHaveText(message);
  }

  // Verify product in overview
  async verifyProductInOverview(productName) {
    await expect(this.getOverviewItem(productName)).toBeVisible();
  }

  // Verify product price in overview
  async verifyProductPriceInOverview(productName, price) {
    await expect(this.getOverviewItemPrice(productName)).toHaveText(price);
  }

  // Get payment information text
  async getPaymentInfo() {
    return await this.paymentInfo.textContent();
  }

  // Get shipping information text
  async getShippingInfo() {
    return await this.shippingInfo.textContent();
  }

  // Verify payment information
  async verifyPaymentInfo(expectedText) {
    const text = await this.getPaymentInfo();
    expect(text).toContain(expectedText);
  }

  // Verify shipping information
  async verifyShippingInfo(expectedText) {
    const text = await this.getShippingInfo();
    expect(text).toContain(expectedText);
  }

  // Get item total
  async getItemTotal() {
    return await this.itemTotal.textContent();
  }

  // Get tax amount
  async getTax() {
    return await this.tax.textContent();
  }

  // Get total amount
  async getTotal() {
    return await this.total.textContent();
  }

  // Verify item total
  async verifyItemTotal(expectedTotal) {
    await expect(this.itemTotal).toContainText(expectedTotal);
  }

  // Verify tax
  async verifyTax(expectedTax) {
    await expect(this.tax).toContainText(expectedTax);
  }

  // Verify total
  async verifyTotal(expectedTotal) {
    await expect(this.total).toContainText(expectedTotal);
  }

  // Verify error message is displayed
  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }

  // Get error message text
  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }

  // Complete full checkout process
  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinueStep1();
    await this.verifyOnCheckoutOverview();
    await this.clickFinish();
    await this.verifyOnOrderConfirmation();
  }

  // Wait for page to load
  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  // Calculate expected item total from cart data
  calculateExpectedItemTotal() {
    return cartData.itemsWithPrices.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price;
    }, 0);
  }

  // Calculate expected tax
  calculateExpectedTax() {
    const itemTotal = this.calculateExpectedItemTotal();
    return itemTotal * CHECKOUT.TAX_RATE;
  }

  // Calculate expected final total
  calculateExpectedFinalTotal() {
    return this.calculateExpectedItemTotal() + this.calculateExpectedTax();
  }

  // Verify calculated item total
  async verifyCalculatedItemTotal() {
    const expectedTotal = this.calculateExpectedItemTotal();
    const actualTotal = await this.getItemTotal();
    expect(parseFloat(actualTotal)).toBeCloseTo(expectedTotal, 2);
  }

  // Verify calculated tax
  async verifyCalculatedTax() {
    const expectedTax = this.calculateExpectedTax();
    const actualTax = await this.getTax();
    expect(parseFloat(actualTax)).toBeCloseTo(expectedTax, 2);
  }

  // Verify calculated final total
  async verifyCalculatedFinalTotal() {
    const expectedTotal = this.calculateExpectedFinalTotal();
    const actualTotal = await this.getTotal();
    expect(parseFloat(actualTotal)).toBeCloseTo(expectedTotal, 2);
  }

  // Verify total calculation: item total + tax = final total
  async verifyTotalCalculation() {
    // Get all three values
    const itemTotal = await this.getItemTotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    
    // Convert to numbers
    const itemTotalNum = parseFloat(itemTotal);
    const taxNum = parseFloat(tax);
    const totalNum = parseFloat(total);
    
    // Verify the math: item total + tax = final total
    const calculatedTotal = itemTotalNum + taxNum;
    expect(totalNum).toBeCloseTo(calculatedTotal, 2);
  }
}

module.exports = CheckoutPage;
