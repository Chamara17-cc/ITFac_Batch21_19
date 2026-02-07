Feature: Edit plant details

  As an Admin
  I want to edit plant details
  So that I can update plant information

  Scenario: Admin opens edit plant form
    Given admin is logged in
    When admin opens plant page
    And admin clicks edit button
    Then save button should be visible