Feature: View plant list

  Background:
    Given I am logged in as a user
    And I am on the Plant List page as a user

  Scenario: UI-USER-PLANT-09 Verify plant table and columns are displayed
    Then I should see at least one plant in the list
    And I should see the Name, Category, Price, and Stock columns
