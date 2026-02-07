Feature: Plant Management API

  Scenario: Admin can create a plant
    When I create a plant under subcategory 13
    Then the response status should be 201

  Scenario: Validation for invalid plantId
    When a user buys a plant with invalid id 9999 and quantity 1
    Then the response status should be 404
    And response should contain NOT_FOUND error
