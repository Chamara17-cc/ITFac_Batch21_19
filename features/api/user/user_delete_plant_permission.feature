Feature: User Plant Deletion Permission API

  Scenario: Verify User cannot delete plant via API
    Given user is authenticated via API
    When user attempts to delete an existing plant
    Then the forbidden error response should be returned