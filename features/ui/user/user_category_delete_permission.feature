Feature: User Category Delete Permissions

  Scenario: Verify User cannot delete category
    Given user is logged into the application
    And user opens the dashboard page
    When user navigates to Categories management
    Then category deletion should not be allowed for user
