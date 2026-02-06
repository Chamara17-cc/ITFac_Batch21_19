@adminApi
Feature: Get plant by invalid ID

  Scenario: Get plant by invalid ID
    When admin requests plant with id 99999
    Then response status should be 404
