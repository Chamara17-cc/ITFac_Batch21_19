@adminApi
Feature: Get all plants (Admin)

  As an Admin
  I want to retrieve all plants
  So that I can view plant details

  Scenario: Get all plants successfully
    When admin sends request to get all plants
    Then response status should be 200
    And response should be a list of plants
