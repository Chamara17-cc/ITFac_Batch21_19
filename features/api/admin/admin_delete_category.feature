Feature: Admin Category Deletion API

  Scenario: Verify Admin can delete a category via API
    Given admin is authenticated via API
    When admin retrieves the list of categories
    And admin deletes an existing category
    Then the category deletion request should be successful