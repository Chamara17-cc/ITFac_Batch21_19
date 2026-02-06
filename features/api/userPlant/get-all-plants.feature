@userApi
Feature: Get all plants (User)

  As a User
  I want to retrieve all plants
  So that I can view available plants

  Scenario: API-USR-GET-01 Get all plants successfully
    When user sends request to get all plants
    Then response status should be 200
    And response should be a list of plants