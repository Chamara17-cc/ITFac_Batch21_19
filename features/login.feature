Feature: Login Functionality

  Scenario: Valid user can login
    Given I am on the login page
    When I login with username "admin" and password "admin123"
    Then I should be redirected to the dashboard
