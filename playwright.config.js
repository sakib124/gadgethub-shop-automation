const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['list']
  ],
  
  use: {
    baseURL: 'https://gadgethub-shop.netlify.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.CI ? true : false,
    channel: 'chrome',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        viewport: null
      },
    },
    
    // Uncomment to run on other browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  timeout: 10000,
  expect: {
    timeout: 5000
  },
});
