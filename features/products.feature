Feature: Gadget Hub Products Page Functionality
  As a logged-in user of Gadget Hub
  I want to be able to view and interact with products
  So that I can add items to my cart and manage my shopping

  Background:
    Given I am on the Gadget Hub login page
    When I login with username "default_user" and password "welcome_123"
    Then I should be redirected to the products page

  @products @ui @smoke @debug
  Scenario: Verify products page layout and elements
    Then I should see the products page title "Products"
    And I should see the cart icon
    And I should see the hamburger menu icon
    And the cart count should be "0"

  @products @positive @smoke 
  Scenario: Verify product cards are displayed
    Then I should see at least 6 product cards
    And each product card should have a product image
    And each product card should have a product name
    And each product card should have a product description
    And each product card should have a product price
    Then all product buttons should show "Add to cart"

  @products@positive @smoke 
  Scenario: Add a single product to cart
    When I add "Wireless Bluetooth Headphones" to the cart
    Then the button for "Wireless Bluetooth Headphones" should change to "Remove"
    And the cart count should be "1"

  @products@positive @functional 
  Scenario: Add multiple products to cart
    When I add "Wireless Bluetooth Headphones" to the cart
    And I add "Smart Fitness Watch" to the cart
    And I add "Mechanical Keyboard" to the cart
    Then the cart count should be "3"
    And the button for "Wireless Bluetooth Headphones" should change to "Remove"
    And the button for "Smart Fitness Watch" should change to "Remove"
    And the button for "Mechanical Keyboard" should change to "Remove"

  @products @positive @functional 
  Scenario: Remove a product from cart
    When I add "Wireless Bluetooth Headphones" to the cart
    And I add "Smart Fitness Watch" to the cart
    Then the cart count should be "2"
    When I remove "Wireless Bluetooth Headphones" from the cart
    Then the cart count should be "1"
    And the button for "Wireless Bluetooth Headphones" should change to "Add to cart"
    And the button for "Smart Fitness Watch" should change to "Remove"

  @products@positive @functional 
  Scenario: Add and remove all products from cart
    When I add "Wireless Bluetooth Headphones" to the cart
    And I add "Smart Fitness Watch" to the cart
    Then the cart count should be "2"
    When I remove "Wireless Bluetooth Headphones" from the cart
    And I remove "Smart Fitness Watch" from the cart
    Then the cart count should be "0"

  @products@ui @functional 
  Scenario: Verify product sorting dropdown
    Then I should see the sort dropdown
    And the sort dropdown should have option "Name (A to Z)"
    And the sort dropdown should have option "Name (Z to A)"
    And the sort dropdown should have option "Price (low to high)"
    And the sort dropdown should have option "Price (high to low)"

  @products@functional @sorting 
  Scenario: Sort products by name A to Z
    When I sort products by "Name (A to Z)"
    Then the products should be sorted alphabetically ascending

  @products @functional @sorting 
  Scenario: Sort products by name Z to A
    When I sort products by "Name (Z to A)"
    Then the products should be sorted alphabetically descending

  @products@functional @sorting 
  Scenario: Sort products by price low to high
    When I sort products by "Price (low to high)"
    Then the products should be sorted by price ascending

  @products @functional @sorting 
  Scenario: Sort products by price high to low
    When I sort products by "Price (high to low)"
    Then the products should be sorted by price descending

  @products@positive @navigation 
  Scenario: Navigate to cart page from products page
    When I add "Wireless Bluetooth Headphones" to the cart
    And I click on the cart icon
    Then I should be redirected to the cart page

  @products@positive @smoke 
  Scenario: Verify specific product details
    Then the product "Wireless Bluetooth Headphones" should have price "$79.99"
    And the product "Smart Fitness Watch" should have price "$149.99"
    And the product "Mechanical Keyboard" should have price "$89.99"

  @products @ui @functional 
  Scenario: Verify hamburger menu functionality
    When I click on the hamburger menu
    Then the sidebar menu should be visible
    And the sidebar should have "All Items" link
    And the sidebar should have "About" link
    And the sidebar should have "Logout" link
    And the sidebar should have "Clear Cart" link

  @products @negative @edge-case 
  Scenario: Attempt to add all products to cart
    When I add all products to the cart
    Then all product buttons should show "Remove"
    And the cart count should match the total number of products

#   @performance
#   Scenario: Add products to cart with delayed login user
#     Given I am on the Gadget Hub login page
#     When I login with username "delayed_login_user" and password "welcome_123"
#     Then I should be redirected to the products page within 10 seconds
#     When I add "Wireless Bluetooth Headphones" to the cart
#     Then the cart count should be "1"

  @products@visual @regression 
  Scenario: Verify product images are loaded
    Then all product images should be loaded
    And no product should have a broken image

  @products @functional @cart-persistence 
  Scenario: Cart persists when navigating back to products
    When I add "Wireless Bluetooth Headphones" to the cart
    And I add "Smart Fitness Watch" to the cart
    And I click on the cart icon
    Then I should be redirected to the cart page
    When I navigate back to the products page
    Then the cart count should be "2"
    And the button for "Wireless Bluetooth Headphones" should change to "Remove"
    And the button for "Smart Fitness Watch" should change to "Remove"