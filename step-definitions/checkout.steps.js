const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const checkoutData = require('../testData/checkoutData');

Given('I am on the checkout information page', async function () {
  await this.checkoutPage.navigateToCheckoutStep1();
  await this.checkoutPage.verifyOnCheckoutStep1();
});

Given('I am on the checkout overview page', async function () {
  await this.checkoutPage.verifyOnCheckoutOverview();
});

When('I fill in the checkout information:', async function (dataTable) {
  const data = dataTable.hashes()[0];
  await this.checkoutPage.fillCheckoutInformation(
    data.firstName,
    data.lastName,
    data.postalCode
  );
});

When('I fill in the checkout information with valid data', async function () {
  await this.checkoutPage.fillCheckoutInfo(checkoutData.validCheckoutInfo);
});

When('I click {string} button on checkout step 1', async function (buttonText) {
  if (buttonText === 'Continue') {
    await this.checkoutPage.clickContinueStep1();
  } else if (buttonText === 'Cancel') {
    await this.checkoutPage.clickCancelStep1();
  }
});

When('I click {string} button on checkout step 2', async function (buttonText) {
  if (buttonText === 'Finish') {
    await this.checkoutPage.clickFinish();
  } else if (buttonText === 'Cancel') {
    await this.checkoutPage.clickCancelStep2();
  }
});

When('I click {string} button on checkout page', async function (buttonText) {
  switch (buttonText) {
    case 'Checkout':
      await this.cartPage.clickCheckout();
      break;
    case 'Continue':
      await this.checkoutPage.clickContinueStep1();
      break;
    case 'Cancel':
      // Check which page we're on
      const url = this.page.url();
      if (url.includes('checkout-step1')) {
        await this.checkoutPage.clickCancelStep1();
      } else if (url.includes('checkout-step2')) {
        await this.checkoutPage.clickCancelStep2();
      }
      break;
    case 'Finish':
      await this.checkoutPage.clickFinish();
      break;
    case 'Back Home':
      await this.checkoutPage.clickBackHome();
      break;
  }
});

When('I complete the checkout process successfully', async function () {
  await this.cartPage.clickCheckout();
  await this.checkoutPage.completeCheckout(
    checkoutData.validCheckoutInfo.firstName,
    checkoutData.validCheckoutInfo.lastName,
    checkoutData.validCheckoutInfo.postalCode
  );
});

When('I am on the order confirmation page', async function () {
  await this.checkoutPage.verifyOnOrderConfirmation();
});

Then('I should see the checkout overview page', async function () {
  await this.checkoutPage.verifyOnCheckoutOverview();
});

Then('I should see all cart items in the overview', async function () {
  for (const item of checkoutData.expectedOverviewItems) {
    await this.checkoutPage.verifyProductInOverview(item);
  }
});

Then('I should see the payment information', async function () {
  const paymentInfo = await this.checkoutPage.getPaymentInfo();
  expect(paymentInfo).toBeTruthy();
  expect(paymentInfo.length).toBeGreaterThan(0);
});

Then('I should see the shipping information', async function () {
  const shippingInfo = await this.checkoutPage.getShippingInfo();
  expect(shippingInfo).toBeTruthy();
  expect(shippingInfo.length).toBeGreaterThan(0);
});

Then('I should see the correct total amount', async function () {
  await this.checkoutPage.verifyTotalCalculation();
});

Then('I should see the order confirmation page', async function () {
  await this.checkoutPage.verifyOnOrderConfirmation();
});

Then('I should see {string} message', async function (expectedMessage) {
  await this.checkoutPage.verifyConfirmationMessage(expectedMessage);
});

Then('I should see {string} with price {string}', async function (productName, price) {
  await this.checkoutPage.verifyProductInOverview(productName);
  await this.checkoutPage.verifyProductPriceInOverview(productName, price);
});

Then('I should see {string} in payment information', async function (expectedText) {
  await this.checkoutPage.verifyPaymentInfo(expectedText);
});

Then('I should see {string} in shipping information', async function (expectedText) {
  await this.checkoutPage.verifyShippingInfo(expectedText);
});

Then('I should see the correct item total', async function () {
  await this.checkoutPage.verifyCalculatedItemTotal();
});

Then('I should see the correct tax amount', async function () {
  await this.checkoutPage.verifyCalculatedTax();
});

Then('I should see the correct final total', async function () {
  await this.checkoutPage.verifyCalculatedFinalTotal();
});

Then('I should remain on the checkout information page', async function () {
  await this.checkoutPage.verifyOnCheckoutStep1();
});

Then('I should see an error for invalid postal code', async function () {
  await this.checkoutPage.verifyErrorMessage();
  const errorText = await this.checkoutPage.getErrorMessageText();
  expect(errorText.toLowerCase()).toContain('postal');
});

