/**
 * Centralized configuration and constants for Gadget Hub automation tests
 */

// Application URLs
const URLS = {
  BASE_URL: 'https://gadgethub-shop.netlify.app/',
  LOGIN_PAGE: 'https://gadgethub-shop.netlify.app/',
  PRODUCTS_PAGE: 'https://gadgethub-shop.netlify.app/pages/products.html',
  CART_PAGE: 'https://gadgethub-shop.netlify.app/pages/cart.html',
  CHECKOUT_STEP1: 'https://gadgethub-shop.netlify.app/pages/checkout-step1.html',
  CHECKOUT_STEP2: 'https://gadgethub-shop.netlify.app/pages/checkout-step2.html',
  CHECKOUT_COMPLETE: 'https://gadgethub-shop.netlify.app/pages/checkout-complete.html'
};

// Timeouts (in milliseconds)
const TIMEOUTS = {
  DEFAULT: 10000,  // For Cucumber setDefaultTimeout
  CART_UPDATE: 5000, // For waitForLoadState after cart operations
  SORT_ANIMATION: 500, // For sort dropdown animation
  REMOVAL_ANIMATION: 500, // For cart item removal animation
  CART_ITEM_ADD: 200 // Small delay for cart item addition
};

// Selectors
const SELECTORS = {
  LOGIN: {
    USERNAME_INPUT: '#username',
    PASSWORD_INPUT: '#password',
    LOGIN_BUTTON: '#login-button',
    ERROR_MESSAGE: '#error-message',
    ERROR_BUTTON: '#error-button'
  },
  PRODUCTS: {
    CONTAINER: '.products-container',
    LOGO: '.logo',
    CART_ICON: '.cart-icon',
    CART_BADGE: '.cart-badge',
    PRODUCT_CARD: '.product-card',
    MENU_BUTTON: '.menu-button',
    PAGE_TITLE: 'h2:has-text("Products")',
    SORT_DROPDOWN: 'select[name="sort"], .sort-dropdown',
    SIDEBAR: '.sidebar, .menu-sidebar',
    ALL_ITEMS_LINK: 'a:has-text("All Items")',
    ABOUT_LINK: 'a:has-text("About")',
    LOGOUT_LINK: 'a:has-text("Logout")',
    CLEAR_CART_LINK: 'a:has-text("Clear Cart")'
  },
  CART: {
    CART_ITEM: '.cart-item',
    CART_ITEM_NAME: '.cart-item-name',
    CART_ITEM_PRICE: '.cart-item-price',
    CART_ITEM_DESCRIPTION: '.cart-item-description',
    CONTINUE_SHOPPING_BUTTON: 'button:has-text("Continue Shopping")',
    CHECKOUT_BUTTON: '#checkout-button',
    PAGE_TITLE: '.title'
  },
  CHECKOUT: {
    // Step 1 - Your Information
    FIRST_NAME_INPUT: '#first-name',
    LAST_NAME_INPUT: '#last-name',
    POSTAL_CODE_INPUT: '#postal-code',
    CANCEL_BUTTON: 'button:has-text("Cancel")',
    CONTINUE_BUTTON: 'button:has-text("Continue")',
    ERROR_MESSAGE: '.error-message-container',
    // Step 2 - Overview
    CHECKOUT_ITEM: '.checkout-item',
    CHECKOUT_ITEM_PRICE: '.checkout-item-price',
    ITEM_TOTAL: '#item-total',
    TAX: '#tax',
    TOTAL: '#total',
    PAYMENT_INFO: '.payment-info',
    SHIPPING_INFO: '.shipping-info',
    FINISH_BUTTON: '#finish-button',
    // Complete page
    COMPLETE_HEADER: '.complete-content h2',
    COMPLETE_TEXT: '.complete-content p',
    BACK_HOME_BUTTON: '.complete-content .btn-primary',
    // General
    PAGE_TITLE: '.h2'
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

// Checkout configuration
const CHECKOUT = {
  TAX_RATE: 0.08 // 8% tax rate
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

// Expected product images (for validation)
const PRODUCT_IMAGES = {
  'Wireless Bluetooth Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  'Smart Fitness Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  'Mechanical Keyboard': 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
  'Portable Power Bank': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
  'USB-C Hub Adapter': 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
  'Wireless Mouse': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
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
  BROWSER_CONFIG,
  PRODUCT_IMAGES,
  CHECKOUT
};
