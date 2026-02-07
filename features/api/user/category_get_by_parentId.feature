@API-USER-CAT-GET-20
Feature: Get subcategories using parentId

  Scenario: API-USER-CAT-GET-20 | Get subcategories using parentId
    Given I am logged in as a user for GET-20
    When I send a GET request to "/api/categories?parentId=1" for GET-20
    Then the API response status should be 200 for GET-20
    And the response should be an array of subcategories with length greater than 0 for GET-20
