Feature: Add plant button visibility for user

  As a User
  I should not see add plant button
  So that I cannot add plants

  Scenario: User does not see add plant button
    Given user is logged in
    When user opens plant page
    Then add plant button should be hidden