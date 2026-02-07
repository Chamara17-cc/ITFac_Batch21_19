Feature: User Category Permissions

  Background:
    Given user is logged into the application
    And user opens the dashboard page

  Scenario: Verify Add Category option is not visible for User
    When user navigates to Categories management
    Then Add Category option should not be visible for user
