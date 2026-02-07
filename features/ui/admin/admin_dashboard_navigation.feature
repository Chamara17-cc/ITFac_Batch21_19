Feature: Admin Dashboard Navigation

  Background:
    Given admin is logged into the application
    And admin opens the dashboard page

  Scenario: Verify Admin can access category management from dashboard
    When admin clicks on Manage Categories button
    Then admin should be navigated to Categories page
    And Categories page heading should be visible
