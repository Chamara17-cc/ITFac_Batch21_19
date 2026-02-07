Feature: User – Plant list action visibility

  Background:
    Given I am logged in as a user
    And I am on the Plant List page as a user

  Scenario: UI-USER-PLANT-06 Verify that edit and delete actions are hidden for user
    Then I should not see any Edit buttons
    And I should not see any Delete buttons
