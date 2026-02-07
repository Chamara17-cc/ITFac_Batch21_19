@userApi
Feature: Get plants by valid category ID (User)

  Scenario: Get plants by valid category ID
    When user requests plants by category id 1
    Then response status should be 200
    And response should be a list of plants