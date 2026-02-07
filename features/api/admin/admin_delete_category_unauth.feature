Feature: Admin Category Deletion API (Unauthorized)

  Scenario: Verify delete category request without authentication
    Given admin has an existing category
    When admin attempts to delete the category without authentication
    Then the unauthorized error response should be returned