Feature: Category Management - Admin

  Scenario: Verify category page loads successfully
    Given I am logged in as admin
    When I open the category page as admin
    Then I should see the category page URL as admin
    And the category page header should be visible as admin
    And the category count should be greater than 0 as admin

  Scenario: Verify pagination works correctly
    Given I am logged in as admin
    When I open the category page as admin
    And I click the next page button as admin
    Then the page number should change as admin

  Scenario: Category Search By Name
    Given I am logged in as admin
    When I open the category page as admin
    And I search category by name "Test01Cat" as admin
    Then the first row name should be "Test01Cat" as admin

  Scenario: Category name is required
    Given I am logged in as admin
    When I open the add category page as admin
    And I click save without entering a name as admin
    Then I should see validation error "Category name is required" as admin


