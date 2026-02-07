Feature: Admin Category Deletion API (Negative)

  Scenario: Verify Admin cannot delete a non-existing category via API
    Given admin is authenticated via API
    When admin attempts to delete a non-existing category
    Then the category deletion error response should be returned