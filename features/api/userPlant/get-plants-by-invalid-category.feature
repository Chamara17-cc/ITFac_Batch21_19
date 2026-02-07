@userApi
Feature: Get plants by invalid category ID (User)

  Scenario: Get plants by invalid category ID
    When user requests plants by category id 99999
    Then response status should be 200
    And response should be a list of plants