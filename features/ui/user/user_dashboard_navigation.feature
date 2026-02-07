Feature: User Dashboard Navigation

  Background:
    Given user is logged into the application
    And user opens the dashboard page

  Scenario: Verify User can access category management from dashboard
    When user clicks on Manage Categories button
    Then user should be navigated to Categories page
    And Categories page heading should be visible
