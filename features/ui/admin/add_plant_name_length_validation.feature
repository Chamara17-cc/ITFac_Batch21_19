Feature: Admin – Plant name length validation

  Background:
    Given I am logged in as an admin
    And I am on the Add Plant page

  Scenario: UI-ADMIN-AP-03 Verify error when plant name is shorter than 3 characters
    When I enter plant details with name "AB"
    And I click Save
    Then I should see the plant name length validation message

  Scenario: UI-ADMIN-AP-03 Verify error when plant name is longer than 25 characters
    When I enter plant details with name "ThisPlantNameIsWayTooLongToBeValid"
    And I click Save
    Then I should see the plant name length validation message

  Scenario: UI-ADMIN-AP-03 Verify no error when plant name length is valid
    When I enter plant details with name "Valid Plant Name"
    And I click Save
    Then I should not see any validation errors
