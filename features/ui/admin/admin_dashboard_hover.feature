Feature: Admin Dashboard Hover Effects

  Background:
    Given admin is logged into the application

  Scenario: Verify Categories card and Manage Categories button are hoverable
    When admin opens the dashboard page
    And admin hovers over the Categories card
    And admin hovers over the Manage Categories button
    Then the Categories card should remain visible
    And the Manage Categories button should remain visible
