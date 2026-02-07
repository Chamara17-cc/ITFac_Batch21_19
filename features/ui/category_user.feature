Feature: Category Management - User

  Scenario: User should NOT see Add Category button
    Given I am logged in as user
    When I open the category page as user
    Then I should NOT see the Add Category button as user

  Scenario: User cannot open Edit page
    Given I am logged in as user
    When I open the category page as user
    And I try to click the Edit button as user
    Then the URL should NOT change as user

  Scenario: Reset button should clear search input for User
    Given I am logged in as user
    When I open the category page as user
    And I search category by name "Test01Cat" as user
    And I click the reset button as user
    Then the search input should be empty as user

  Scenario: Category Search By Name
    Given I am logged in as user
    When I open the category page as user
    And I search category by name "Test01Cat" as user
    Then the first row name should be "Test01Cat" as user

  Scenario: Delete button should be disabled for User
    Given I am logged in as user
    When I open the category page as user
    Then the Delete button should be disabled as user

  Scenario: Show message when no categories are available
    Given I am logged in as user
    When I open the category page as user
    Then I should see "No categories available" message
