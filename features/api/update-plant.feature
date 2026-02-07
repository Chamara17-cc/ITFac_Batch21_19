Feature: Update Plant API

  Background:
    Given the Plant API is available
    And the plant with ID 1 exists
    And the category ID 6 exists for plants

  Scenario: Admin updates plant with valid data
    When I update the plant with ID 1 as admin with name "Plant 1", price 500, quantity 10, category 6
    Then the plant response status should be 200
    And the plant response should contain id 1, price 500, and quantity 10

  Scenario: Update plant without authentication
    When I update the plant with ID 1 without authentication
    Then the plant response status should be 401

  Scenario: User cannot update plant
    When I update the plant with ID 1 as normal user with name "Plant 1", price 200, quantity 5, category 6
    Then the plant response status should be 403

  Scenario: Negative price
    When I update the plant with ID 1 as admin with name "Plant 1", price -10, quantity 5, category 6
    Then the plant response status should be 400

  Scenario: Negative quantity
    When I update the plant with ID 1 as admin with name "Plant 1", price 100, quantity -5, category 6
    Then the plant response status should be 400
