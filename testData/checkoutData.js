module.exports = {
  // Valid checkout information
  validCheckoutInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },

  // Alternative valid checkout information
  alternativeCheckoutInfo: {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: '54321'
  },

  // Invalid checkout information
  invalidCheckoutInfo: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: 'ABC' // Invalid postal code
  },

  // Empty checkout information
  emptyCheckoutInfo: {
    firstName: '',
    lastName: '',
    postalCode: ''
  },

  // Expected overview items
  expectedOverviewItems: [
    'Smart Fitness Watch',
    'Wireless Bluetooth Headphones'
  ],

  // Expected pricing information
  expectedPricing: {
    itemTotal: '$229.98',
    tax: '$18.40',
    total: '$248.38'
  },

  // Expected payment information
  expectedPaymentInfo: 'Card #12757',

  // Expected shipping information
  expectedShippingInfo: 'Free Express Delivery!',

  // Confirmation message
  confirmationMessage: 'Thank you for your order!',

  // Confirmation text
  confirmationText: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
};
