Feature: Category Management API

  Scenario: Admin can create category
    When I create a category with random name
    Then the response status should be 201
    And response should contain category id

  Scenario: Create category with empty name
    When I create a category with empty name
    Then the response status should be 400
    And response should contain error message

  Scenario: Verify category name length validation
    When I create category with name "C"
    Then the response status should be 400
    And response message should be "Validation failed"

    When I create category with name "VeryLongName123"
    Then the response status should be 400
    And response message should be "Validation failed"
