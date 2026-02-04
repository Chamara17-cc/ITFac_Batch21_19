Feature: Admin – Add Plant mandatory field validation

  Scenario: UI-ADMIN-AP-02 Verify validation when mandatory fields are empty
    Given I am logged in as an admin
    And I am on the Add Plant page
    When I click Save without entering any details
    Then I should see all mandatory field validation messages
    And I should see the plant name length validation message
