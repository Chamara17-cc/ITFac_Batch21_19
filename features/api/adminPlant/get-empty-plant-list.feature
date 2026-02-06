@skip
Feature: Get empty plant list

  Scenario: Get empty plant list when no plants exist
    When admin sends request to get all plants
    Then response status should be 200
    And plant list should be empty
