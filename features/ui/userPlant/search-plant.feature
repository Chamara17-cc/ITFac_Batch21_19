Feature: Search plant by name

  As a User
  I want to search plants
  So that I can find a specific plant

  Scenario: User searches plant by name
    Given user is logged in
    When user opens plant page
    And user searches for plant "Rose Plant"
    Then matching plants should be displayed