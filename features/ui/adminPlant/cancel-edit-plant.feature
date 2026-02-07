Feature: Cancel edit plant

  As an Admin
  I want to cancel editing a plant
  So that no changes are saved

  Scenario: Admin cancels edit plant
    Given admin is logged in
    When admin opens plant page
    And admin starts editing a plant
    And admin clicks cancel button
    Then admin should be redirected to plant list