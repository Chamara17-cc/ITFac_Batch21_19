Feature: Admin – Category API tests
@API-ADMIN-CAT-GET-11
  Scenario: API-ADMIN-CAT-GET-11 | Get category by valid ID
    Given I am logged in as an admin via API
    When I send a GET request via API to "/api/categories/1"
    Then the response status should be 200
    And the response should have "id" with value 1
