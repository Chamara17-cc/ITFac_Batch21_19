Feature: Sort Plants by Price

  Background:
    Given I am logged in as a user
    And I am on the Plant List page as a user

  Scenario: UI-USER-PLANT-01 Verify plants are sorted by price ascending and descending
    When I sort plants by Price column
    Then I should see the plants sorted by Price in ascending order
    When I sort plants by Price column
    Then I should see the plants sorted by Price in descending order
