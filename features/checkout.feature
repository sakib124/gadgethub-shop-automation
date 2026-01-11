Feature: Checkout Process
  As a customer
  I want to complete the checkout process
  So that I can purchase the items in my cart

  Background:
    Given I am logged in as a valid user
    And I have added items to my cart
    And I am on the cart page

  @checkout @smoke @e2e @happy-path @debug
  Scenario: Complete checkout with valid information
    When I click "Checkout" button on cart page
    And I fill in the checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click "Continue" button on checkout step 1
    Then I should see the checkout overview page
    And I should see all cart items in the overview
    And I should see the payment information
    And I should see the shipping information
    And I should see the correct total amount
    When I click "Finish" button on checkout page
    Then I should see the order confirmation page
    And I should see "Thank you for your order!" message

  @checkout @functional 
  Scenario: Verify checkout overview details
    When I click "Checkout" button on cart page
    And I fill in the checkout information with valid data
    And I click "Continue" button on checkout step 1
    Then I should see the checkout overview page
    And I should see "Smart Fitness Watch" with price "$149.99"
    And I should see "Wireless Bluetooth Headphones" with price "$79.99"
    And I should see "Card #12757" in payment information
    And I should see "Free Express Delivery!" in shipping information
    And I should see the correct item total
    And I should see the correct tax amount
    And I should see the correct final total

  @checkout @functional @negative 
  Scenario: Cancel checkout on information page
    When I click "Checkout" button on cart page
    And I click "Cancel" button on checkout page
    Then I should be redirected to the cart page
    And my cart items should still be present

  @checkout @functional @negative
  Scenario: Cancel checkout on overview page
    When I click "Checkout" button on checkout page
    And I fill in the checkout information with valid data
    And I click "Continue" button on checkout step 1
    Then I should see the checkout overview page
    When I click "Cancel" button on checkout page
    Then I should be redirected to the cart page
    And my cart items should still be present

  @checkout @validation @negative
  Scenario: Checkout with empty fields prevents progression
    When I click "Checkout" button on cart page
    And I click "Continue" button on checkout step 1
    Then I should remain on the checkout information page

  @checkout @navigation 
  Scenario: Return to home page after order completion
    When I complete the checkout process successfully
    And I am on the order confirmation page
    And I click "Back Home" button on checkout page
    Then I should be redirected to the products page
    And the cart should be empty

  @checkout @functional
  Scenario: Verify cart is cleared after successful order
    When I complete the checkout process successfully
    Then the cart icon should display "0" items
