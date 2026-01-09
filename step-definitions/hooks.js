const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { BROWSER_CONFIG, TIMEOUTS } = require('../config/constants');

setDefaultTimeout(TIMEOUTS.DEFAULT * 2);

let browser;
let context;
let page;

// Browser lifecycle hooks
Before(async function() {
  browser = await chromium.launch({ 
    headless: BROWSER_CONFIG.HEADLESS,
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
  this.pageObjects = {};
});

After(async function(scenario) {
  // Take screenshot if scenario failed
  const status = scenario.result?.status || scenario.status;
  
  if (status === 'FAILED' || status === 'failed') {
    try {
      const screenshotsDir = path.join(__dirname, '../screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      
      const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
      const screenshotPath = path.join(screenshotsDir, `${scenarioName}.png`);
      
      const screenshot = await this.page?.screenshot({ path: screenshotPath, fullPage: true });
      
      // Attach screenshot to Cucumber report
      if (screenshot) {
        this.attach(screenshot, 'image/png');
      }
      
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`❌ Screenshot error: ${error.message}`);
    }
  }
  
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
