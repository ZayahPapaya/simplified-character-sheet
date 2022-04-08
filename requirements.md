
# Software Requirements

## Vision

- Our vision for our product is to have a clean and simplified character sheet for ease of access, as well as an automated user form for generating multiple saved sheets on a local system.

- As a newer player, this can help streamline early play before the player fully understands the mechanics behind the page that this software automates.

- Most online character sheets require a steady internet connection, are paid or subscription model products, and/or may be restrictive in the options presented. Our software, on the other hand, can be run locally on a game master's laptop to save and load their players' sheets without internet connection nor paying, and without the usual content restrictions.

## Scope

### Scope In

- Save, load, and delete multiple characteer sheets
- Input basic information from a user form
- Generate digital dice rolls that calculate the player's stat
- Generate the player's stat modifiers
- Have a clear and simple design for clarity

### Scope Out

- Will not teach players the mechanics of the game
- Will not be as extensive as an official character sheet
- Will not edit already made sheets without deleting and recreating them

### Minimum Viable Product

 At minimum, our product should be able to save and load sheets from a user form, and roll dice.

### Stretch Goals

 Additional options for skills, or entries for other parts of a character that our page currently lacks

## Functional Requirements

- A player can generate and delete a sheet
- A user can view a list of character sheets via the load dropdown
- A user can click on a modifier to roll the dice

### Data Flow

 Data should start at the user form until it is filled out, and then is submitted. The submission should be saved as a character object that is saved as one of the loadable options. A character object should be selected with the load dropdown and guide the user to a second page displaying that loaded character. There should be a return button to go back to the form.
