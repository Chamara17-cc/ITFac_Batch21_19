Feature: User Dashboard

  Background:
    Given user is logged into the application
    And user opens the dashboard page

  Scenario: Verify User Dashboard loads successfully
    Then all dashboard cards should be visible for user
