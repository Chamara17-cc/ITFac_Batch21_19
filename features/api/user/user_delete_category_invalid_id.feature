Feature: User Category Deletion With Invalid ID API

  Scenario: Verify User delete with invalid category ID
    Given user is authenticated via API
    When user attempts to delete a category with an invalid ID
    Then a category deletion error response should be returned for user