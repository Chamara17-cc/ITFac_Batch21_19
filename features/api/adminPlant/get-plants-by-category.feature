@adminApi
Feature: Get plants by category

  Scenario: Get plants by valid category ID
    When admin requests plants by category id 1
    Then response status should be 200
    And response should be a list of plants
