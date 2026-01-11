Feature: Gadget Hub Login Functionality
  As a user of Gadget Hub
  I want to be able to login with valid credentials
  So that I can access the inventory page

  Background:
    Given I am on the Gadget Hub login page

  @login @positive @smoke 
  Scenario: Successful login with default user
    When I login with username "default_user" and password "welcome_123"
    Then I should be redirected to the products page
    And I should see the Gadget Hub logo

  @login @positive @regression
  Scenario: Successful login with image error user
    When I login with username "image_error_user" and password "welcome_123"
    Then I should be redirected to the products page
    And I should see the products container

  @login @positive @performance
  Scenario: Successful login with delayed login user
    When I login with username "delayed_login_user" and password "welcome_123"
    Then I should be redirected to the products page within 10 seconds
    And I should see the products container

  @login @negative @security
  Scenario: Login attempt with locked out user
    When I login with username "account_locked_user" and password "welcome_123"
    Then I should see an error message "Sorry, this user has been locked out."
    And I should remain on the login page

  @login @positive @regression
  Scenario: Successful login with cart failure user
    When I login with username "cart_failure_user" and password "welcome_123"
    Then I should be redirected to the products page
    And I should see the products container
  
  @login @negative @validation
  Scenario: Login with invalid username
    When I login with username "invalid_user" and password "welcome_123"
    Then I should see an error message containing "Username/password combination not found"

  @login @negative @validation
  Scenario: Login with invalid password
    When I login with username "default_user" and password "wrong_password"
    Then I should see an error message containing "Username/password combination not found"

  @login @negative @validation
  Scenario: Login with empty username
    When I login with username "" and password "welcome_123"
    Then I should see an error message "Username is required"

  @login @negative @validation
  Scenario: Login with empty password
    When I login with username "default_user" and password ""
    Then I should see an error message "Password is required"

  @login @negative @validation
  Scenario: Login with both fields empty
    When I login with username "" and password ""
    Then I should see an error message "Username is required"

  @login @ui @smoke
  Scenario: Verify login page elements
    Then the username input should be visible
    And the password input should be visible
    And the login button should be visible
    And the username input should have placeholder "Username"
    And the password input should have placeholder "Password"
    And the login button should have value "Login"
