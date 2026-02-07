Feature: Sort plants by name

  Background:
    Given I am logged in as a user
    And I am on the Plant List page as a user

  Scenario: UI-USER-PLANT-08 Verify plants are sorted by Name (A → Z)
    When I sort plants by Name column
    Then I should see the plants sorted alphabetically by Name
