Feature: Admin Category Permissions

  Background:
    Given admin is logged into the application
    And admin opens the dashboard page

  Scenario: Verify Add Category option is visible for Admin
    When admin navigates to Categories management
    Then Add Category option should be visible
    And Add Category option should be enabled
    And Categories page should be loaded
