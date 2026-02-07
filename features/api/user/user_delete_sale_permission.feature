@skip
Feature: User Sale Deletion Permission API

  Scenario: Verify User cannot delete sales record via API
    Given user is authenticated via API
    When user attempts to delete an existing sale
    Then the forbidden error response should be returned