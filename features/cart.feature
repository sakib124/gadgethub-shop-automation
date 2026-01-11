Feature: Shopping Cart
  As a customer
  I want to manage items in my shopping cart
  So that I can review my selections before checkout

  Background:
    Given I am logged in as a valid user

  @cart @smoke @ui 
  Scenario: View cart with items
    Given I have added items to my cart
    When I navigate to the cart page
    Then I should see all items in my cart
    And I should see the correct prices for each item

  @cart @functional 
  Scenario: Remove item from cart
    Given I have added "Wireless Bluetooth Headphones" to my cart
    And I have added "Smart Fitness Watch" to my cart
    When I navigate to the cart page
    And I remove "Wireless Bluetooth Headphones" from the cart page
    Then "Wireless Bluetooth Headphones" should not be visible in the cart
    And "Smart Fitness Watch" should still be visible in the cart

  @cart @functional 
  Scenario: Remove all items from cart
    Given I have added multiple items to my cart
    When I navigate to the cart page
    And I remove all items from the cart
    Then the cart should be empty

  @cart @navigation 
  Scenario: Continue shopping from cart
    Given I have added items to my cart
    When I navigate to the cart page
    And I click "Continue Shopping" button on cart page
    Then I should be redirected to the products page

  @cart @navigation @smoke 
  Scenario: Proceed to checkout from cart
    Given I have added items to my cart
    When I navigate to the cart page
    And I click "Checkout" button on cart page
    Then I should be redirected to the checkout information page

  @cart @ui @debug
  Scenario: View cart icon badge with item count
    Given I have added "2" items to my cart
    When I navigate to any page
    Then the cart icon should display "2" items
