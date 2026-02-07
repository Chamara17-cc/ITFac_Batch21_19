@API-ADMIN-CAT-GET-14
Feature: Get all subcategories

  Scenario: API-ADMIN-CAT-GET-14 | Get all subcategories
    Given I am logged in as an API admin for GET-14
    When I send a GET request to "/api/categories/sub-categories" for GET-14
    Then the API response status should be 200 for GET-14
    And the response should be an array of subcategories for GET-14
