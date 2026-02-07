Feature: Admin Sale Deletion API

  Scenario: Verify Admin can delete a sale via API
    Given admin is authenticated via API
    When admin retrieves the list of sales
    And admin deletes an existing sale
    Then the sale deletion request should be successful