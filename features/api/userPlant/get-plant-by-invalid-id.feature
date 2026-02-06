@userApi
Feature: Get plant by invalid ID (User)

  Scenario: Get plant by invalid ID
    When user requests plant with id 99999
    Then response status should be 404