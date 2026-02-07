@API-USER-CAT-GET-16
Feature: Get category by valid ID as User

  Scenario: API-USER-CAT-GET-16 | Get category by valid ID
    Given I am logged in as a user for GET-16
    When I send a GET request to "/api/categories/1" with user token for GET-16
    Then the API response status should be 200 for GET-16
    And the response should have "id" with value 1 for GET-16
