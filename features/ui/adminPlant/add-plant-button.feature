Feature: Add a Plant button

  As an Admin
  I want to see the "Add a Plant" button
  So that I can add new plants to the system

  Scenario: Add a Plant button is visible for admin
    Given admin is logged in
    When admin opens the plant page
    Then "Add a Plant" button should be visible
