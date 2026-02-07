Feature: User Category Deletion Permission API

  Scenario: Verify User cannot delete category via API
    Given user is authenticated via API
    When user attempts to delete an existing category
    Then the forbidden error response should be returned