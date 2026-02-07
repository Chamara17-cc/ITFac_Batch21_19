@API-ADMIN-CAT-GET-15
Feature: Unauthorized access attempt

  Scenario: API-ADMIN-CAT-GET-15 | Unauthorized access attempt
    When I send a GET request to "/api/categories/1" without a token for GET-15
    Then the API response status should be 401 for GET-15
