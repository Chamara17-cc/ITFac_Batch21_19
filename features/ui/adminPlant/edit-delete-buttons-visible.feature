Feature: Edit and delete buttons visibility

  As an Admin
  I want to see edit and delete buttons
  So that I can manage plant records

  Scenario: Admin sees edit and delete buttons on plant list
    Given admin is logged in
    When admin opens plant page
    Then edit and delete buttons should be visible