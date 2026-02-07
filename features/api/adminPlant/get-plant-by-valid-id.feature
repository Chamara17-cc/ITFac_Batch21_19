@adminApi
Feature: Get plant by valid ID

  Scenario: Get plant by valid ID
    When admin requests plant with id 1
    Then response status should be 200
    And response should contain plant details
