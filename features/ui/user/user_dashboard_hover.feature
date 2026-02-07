Feature: User Dashboard Hover Effects

  Background:
    Given user is logged into the application
    And user opens the dashboard page

  Scenario: Verify Categories card and Manage Categories button hover effects
    When user hovers over the Categories card
    And user hovers over the Manage Categories button
    Then Categories card should remain visible for user
    And Manage Categories button should remain visible for user
