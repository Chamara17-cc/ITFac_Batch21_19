Feature: No plants found message

  As a User
  I want to see a message when no plants exist
  So that I understand the list is empty

  Scenario: No plants found message displayed
    Given user is logged in
    When user opens plant page
    Then no plants message should be shown if list is empty