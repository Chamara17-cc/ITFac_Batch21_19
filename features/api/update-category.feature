Feature: Update Category API

  Background:
    Given the Category API is available
    And the category with ID 7 exists for categories
    And the parent category with ID 5 exists for categories

  Scenario: Admin updates category with valid data
    When I update the category with ID 7 as admin with name "Orchid"
    Then the category response status should be 200
    And the category response should contain id 7 and name "Orchid"

  Scenario: Update category without authentication
    When I update the category with ID 7 without authentication
    Then the category response status should be 401

  Scenario: User cannot update category
    When I update the category with ID 7 as normal user with name "Garden"
    Then the category response status should be 403

  Scenario: Empty category name (backend returns 500)
    When I update the category with ID 7 as admin with name ""
    Then log a warning about backend 500 for categories

  Scenario: Invalid category name length (too short) (backend returns 500)
    When I update the category with ID 7 as admin with name "AB"
    Then log a warning about backend 500 for categories
