Feature: Admin Dashboard

  Background:
    Given admin is logged into the application

  Scenario: Verify Admin Dashboard loads successfully
    When admin opens the dashboard page
    Then the admin dashboard URL should be displayed
    And all dashboard cards should be visible
