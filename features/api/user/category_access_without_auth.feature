@API-USER-CAT-GET-19
Feature: Access subcategories without authentication

  Scenario: API-USER-CAT-GET-19 | Access subcategories without authentication
    Given I am not logged in as a user for GET-19
    When I send a GET request to "/api/categories/sub-categories" without token for GET-19
    Then the API response status should be 401 for GET-19
