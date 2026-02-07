Feature: Filter plants by category

  As a User
  I want to filter plants by category
  So that I can view related plants

  Scenario: User filters plants by category
    Given user is logged in
    When user opens plant page
    And user filters plants by category "Flowers"
    Then filtered plants should be displayed