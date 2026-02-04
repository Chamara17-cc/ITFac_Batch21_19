Feature: Load plant list

  As an Admin
  I want to view the plant list
  So that I can manage available plants

  Scenario: UI-ADM-PLANT-01 Admin loads plant list successfully
    Given admin is logged in
    When admin opens plant page
    Then plant list should be displayed
