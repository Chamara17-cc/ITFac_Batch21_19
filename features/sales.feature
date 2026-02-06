Feature: Sales Page UI

  # Admin Delete confirmation
  Scenario: Delete confirmation popup appears when admin deletes a sale
    Given I am logged in as admin
    And I am on the sales page
    When I click the delete button
    Then I should see delete confirmation popup

  # Delete option hidden for normal user
  Scenario: Delete option is hidden for user
    Given I am logged in as user
    And I am on the sales page
    Then delete buttons should not be visible

  # Pagination test
  Scenario: Sales pagination works when records exceed one page
    Given I am logged in as admin
    And I am on the sales page
    Then pagination should have multiple pages
    When I navigate to the next page
    Then the sales rows on the next page should be visible

  # Plants sorted by Sold At descending
  Scenario: Plants sorted by Sold At date and time descending
    Given I am logged in as admin
    And I am on the sales page
    Then plants should be sorted by Sold At descending

  # Successful sale redirects to Sales list
  Scenario: Successful sale redirects to Sales list
    Given I am logged in as admin
    When I sell a plant with value "2" and quantity 5
    Then I should be redirected to the sales page
    And new sale should be visible

  # Verify Delete button visibility for admin
  Scenario: Verify Delete option is visible for Admin
    Given I am logged in as admin
    And I am on the sales page
    Then delete button should be visible
    And there should be more than 1 delete button

  # Verify "No sales found" message
  Scenario: Verify "No sales found" message when sales list is empty
    Given I am logged in as admin
    And I am on the sales page
    Then "No sales found" message should appear if table is empty

  # Verify Sell Plant button visibility
  Scenario: Verify Sell Plant button visibility for Admin
    Given I am logged in as admin
    And I am on the sales page
    Then Sell Plant button should be visible
