@API-ADMIN-CAT-GET-12
Feature: Admin – Get category by invalid ID

  Scenario: API-ADMIN-CAT-GET-12 | Get category by invalid ID
    Given I am logged in as an API admin
    When I send a GET request to "/api/categories/100"
    Then the API response status should be 404
    And the API response should have a message containing "Category not found"
