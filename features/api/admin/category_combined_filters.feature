@API-ADMIN-CAT-GET-13
Feature: API Admin - Get categories using combined filters

  Scenario: Combined filters (name + parentId)
    Given I am logged in as an API admin for combined filters
    When I send a GET request to "/api/categories?name=Flower&parentId=1" for combined filters
    Then the API response status should be 200 for combined filters
    And each category name should contain "Flower" for combined filters
    And each category parentId should be 1 for combined filters
