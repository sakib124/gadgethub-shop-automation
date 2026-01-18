const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { BROWSER_CONFIG, TIMEOUTS } = require('../config/constants');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

setDefaultTimeout(TIMEOUTS.DEFAULT * 2);

let browser;
let context;
let page;

// Browser lifecycle hooks
Before(async function() {
  const isCI = process.env.CI === 'true';
  browser = await chromium.launch({ 
    headless: isCI ? true : BROWSER_CONFIG.HEADLESS,
    args: BROWSER_CONFIG.ARGS
  });
  context = await browser.newContext({
    viewport: BROWSER_CONFIG.VIEWPORT
  });
  page = await context.newPage();
  
  // Store page in the World context for access in step definitions
  this.page = page;
  this.context = context;
  this.browser = browser;
  
  // Initialize page objects storage
  this._pageObjects = {};
  
  // Define getters for lazy initialization of page objects
  Object.defineProperty(this, 'loginPage', {
    get: function() {
      if (!this._pageObjects.loginPage) {
        this._pageObjects.loginPage = new LoginPage(this.page);
      }
      return this._pageObjects.loginPage;
    }
  });
  
  Object.defineProperty(this, 'productsPage', {
    get: function() {
      if (!this._pageObjects.productsPage) {
        this._pageObjects.productsPage = new ProductsPage(this.page);
      }
      return this._pageObjects.productsPage;
    }
  });
  
  Object.defineProperty(this, 'cartPage', {
    get: function() {
      if (!this._pageObjects.cartPage) {
        this._pageObjects.cartPage = new CartPage(this.page);
      }
      return this._pageObjects.cartPage;
    }
  });
  
  Object.defineProperty(this, 'checkoutPage', {
    get: function() {
      if (!this._pageObjects.checkoutPage) {
        this._pageObjects.checkoutPage = new CheckoutPage(this.page);
      }
      return this._pageObjects.checkoutPage;
    }
  });
});

After(async function(scenario) {
  const status = scenario.result?.status || scenario.status;
  const screenshotsDir = path.join(__dirname, '../screenshots');
  const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
  const screenshotPath = path.join(screenshotsDir, `${scenarioName}.png`);
  
  if (status === 'FAILED' || status === 'failed') {
    // Take screenshot if scenario failed
    try {
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      
      const screenshot = await this.page?.screenshot({ path: screenshotPath, fullPage: true });
      
      // Attach screenshot to Cucumber report
      if (screenshot) {
        this.attach(screenshot, 'image/png');
      }
      
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`❌ Screenshot error: ${error.message}`);
    }
  } else {
    // Delete screenshot if test passed and screenshot exists from previous run
    try {
      if (fs.existsSync(screenshotPath)) {
        fs.unlinkSync(screenshotPath);
        console.log(`🗑️ Deleted old screenshot: ${screenshotPath}`);
      }
    } catch (error) {
      console.log(`❌ Error deleting screenshot: ${error.message}`);
    }
  }
  
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
