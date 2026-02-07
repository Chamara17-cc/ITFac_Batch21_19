Feature: Admin – Cancel Add Plant

  Scenario: UI-ADMIN-AP-05 Cancel adding a plant navigates to Plant List
    Given I am logged in as an admin
    And I open the Add Plant page
    When I click the Cancel button
    Then I should be redirected to the Plant List page
