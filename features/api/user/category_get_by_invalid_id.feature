@API-USER-CAT-GET-17
Feature: Get category by invalid ID as User

  Scenario: API-USER-CAT-GET-17 | Get category by invalid ID
    Given I am logged in as a user for GET-17
    When I send a GET request to "/api/categories/9999" with user token for GET-17
    Then the API response status should be 404 for GET-17
