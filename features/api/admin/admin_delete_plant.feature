Feature: Admin Plant Deletion API

  Scenario: Verify Admin can delete a plant via API
    Given admin is authenticated via API
    When admin retrieves the list of plants
    And admin deletes an existing plant
    Then the plant deletion request should be successful