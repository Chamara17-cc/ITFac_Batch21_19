Feature: Admin – Plant price validation

  Background:
    Given I am logged in as an admin
    And I am on the Add Plant page

  Scenario: UI-ADMIN-AP-04 Verify error when price is zero
    When I enter plant details with invalid price "0"
    And I click Save
    Then I should see the price greater than zero validation message

  Scenario: UI-ADMIN-AP-04 Verify error when price is negative
    When I enter plant details with invalid price "-50"
    And I click Save
    Then I should see the price greater than zero validation message
