@userApi
Feature: Get plant by valid ID (User)

  Scenario: Get plant by valid ID
    When user requests plant with id 1
    Then response status should be 200
    And response should contain plant details