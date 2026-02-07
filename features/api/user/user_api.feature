Feature: User API tests

  Scenario: User cannot create plant
    When the user tries to create a plant under subcategory 13
    Then the response status should be 403

  Scenario: User cannot create sale using admin plant
    When the admin creates a plant under subcategory 13
    And the user tries to create a sale using the plant
    Then the response status should be 403

  Scenario: Retrieve sales list with pagination
    When the admin retrieves sales page 0 with size 2
    Then the sales list response should be valid with page 0 and size 2

  Scenario: Retrieve empty sales list
    When the admin retrieves an empty sales list
    Then the sales list should be empty

  Scenario: Verify sales sorting
    When the admin retrieves sales page 0 with size 5 to check sorting
    Then the sales should be sorted by soldAt descending
