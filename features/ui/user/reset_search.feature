Feature: Reset search functionality

  Background:
    Given I am logged in as a user
    And I am on the Plant List page as a user

  Scenario: UI-USER-PLANT-07 Verify reset functionality for search
    When I search for plant "Rose"
    Then I should see some plants matching the search
    When I click the Reset button
    Then I should see all plants listed
