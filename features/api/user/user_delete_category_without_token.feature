Feature: User Category Deletion Without Authentication API

  Scenario: Verify delete category request without token
    Given an existing category is available
    When a delete category request is sent without authentication
    Then an unauthorized error response should be returned