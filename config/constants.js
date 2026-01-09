/**
 * Centralized configuration and constants for Gadget Hub automation tests
 */

// Application URLs
const URLS = {
  BASE_URL: 'https://gadgethub-shop.netlify.app/',
  LOGIN_PAGE: 'https://gadgethub-shop.netlify.app/',
  PRODUCTS_PAGE: 'https://gadgethub-shop.netlify.app/pages/products.html'
};

// Timeouts (in milliseconds)
const TIMEOUTS = {
  DEFAULT: 10000,  // For Cucumber setDefaultTimeout
  CART_UPDATE: 500 // For waitForLoadState after cart operations
};

// Selectors
const SELECTORS = {
  LOGIN: {
    USERNAME_INPUT: '#username',
    PASSWORD_INPUT: '#password',
    LOGIN_BUTTON: '#login-button',
    ERROR_MESSAGE: '#error-message'
  },
  PRODUCTS: {
    CONTAINER: '.products-container',
    LOGO: '.logo',
    CART_ICON: '.cart-icon',
    CART_BADGE: '.cart-badge',
    PRODUCT_CARD: '.product-card',
    MENU_BUTTON: '.menu-button'
  }
};

// Test credentials
const CREDENTIALS = {
  VALID_PASSWORD: 'welcome_123',
  USERS: {
    DEFAULT: 'default_user',
    LOCKED_OUT: 'account_locked_user',
    IMAGE_ERROR: 'image_error_user',
    DELAYED_LOGIN: 'delayed_login_user',
    CART_FAILURE: 'cart_failure_user',
    VISUAL: 'visual_user'
  }
};

// Error messages
const ERROR_MESSAGES = {
  LOGIN: {
    LOCKED_OUT: 'Sorry, this user has been locked out.',
    INVALID_CREDENTIALS: 'Username/password combination not found',
    USERNAME_REQUIRED: 'Username is required',
    PASSWORD_REQUIRED: 'Password is required'
  },
  PAGE_OBJECT: {
    ELEMENT_NOT_FOUND: 'Element not found or not visible',
    TIMEOUT: 'Operation timed out',
    NAVIGATION_FAILED: 'Navigation failed'
  }
};

// Browser configuration
const BROWSER_CONFIG = {
  HEADLESS: false,
  ARGS: ['--start-maximized'],
  VIEWPORT: null
};

module.exports = {
  URLS,
  TIMEOUTS,
  SELECTORS,
  CREDENTIALS,
  ERROR_MESSAGES,
  BROWSER_CONFIG
};
