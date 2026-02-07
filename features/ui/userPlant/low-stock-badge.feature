Feature: Low stock indicator

  As a User
  I want to see low stock plants
  So that I know availability

  Scenario: Low stock badge is visible
    Given user is logged in
    When user opens plant page
    Then low stock badge should be visible