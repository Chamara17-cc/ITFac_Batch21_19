@API-USER-CAT-GET-18
Feature: Get all subcategories as User

  Scenario: API-USER-CAT-GET-18 | Get all subcategories
    Given I am logged in as a user for GET-18
    When I send a GET request to "/api/categories/sub-categories" with user token for GET-18
    Then the API response status should be 200 for GET-18
    And the response should be an array of subcategories for GET-18
