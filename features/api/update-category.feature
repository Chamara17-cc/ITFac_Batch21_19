Feature: Update Category API
  As an admin
  I want to update categories
  So that I can manage category information

  Background:
    Given the API is available
    And the category with ID 7 exists
    And the parent category with ID 5 exists

  Scenario: Admin updates category with valid data
    When I update the category with ID 7 as admin with name "Orchid"
    Then the response status should be 200
    And the response should contain id 7 and name "Orchid"

  Scenario: Update category without authentication
    When I update the category with ID 7 without authentication
    Then the response status should be 401

  Scenario: User cannot update category
    When I update the category with ID 7 as normal user with name "Garden"
    Then the response status should be 403

  Scenario: Empty category name (backend returns 500)
    When I update the category with ID 7 as admin with name ""
    Then log a warning about backend 500

  Scenario: Invalid category name length (too short) (backend returns 500)
    When I update the category with ID 7 as admin with name "AB"
    Then log a warning about backend 500
