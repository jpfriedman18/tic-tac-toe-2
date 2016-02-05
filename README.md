[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Overview

The purpose of this app to to allow a user to play the class time-passing game
Tic-Tac-Toe in their browser. In order to play the game, the user must create
and log in with an account, the details of which are stored on a back-end
server. Each move by a player is also sent to the server and stored on the
back-end, and the board in the browser is rendered from a representation of the
board retrieved from the server. Wins are tracked on a scoreboard at the bottom
of the page.

## Gameplay

When starting the first game of the session, the first player to make a move
is 'X'. Players then alternate between 'X' and 'O' until either one player wins,
or there is a draw. The player whose turn it currently is will be displayed in
the scoreboard at the bottom of the page. Upon the completion of a game, the
winner is declared in an alert, the scoreboard changes to reflect the winner
(or stays the same in the event of a draw), and the board is cleared. At the
start of a new game, the loser of the previous game will go first, or in the
event of a draw, the opposite player of whomever went last in the previous game
will go first. This continues until the user logs out of their account, at which
point the board will be hidden again until another user logs in.

##Technologies Used

The front-end of the app is built with HTML and styled using the Bootstrap sass
framework. The game logic is built using JavaScript, which interacts with the
interface using jQuery. The JavaScript also uses AJAX to interact with the
back-end server, using FormData to send sign up, sign in, sign out, and
change password requests, and JSON to send game data requests to create new
instances of a game on the back-end, update the game-state, and retrieve
the game-state. The visual representation of the board is then rendered
using data from the back-end using jQuery.

## User Stories

Upon opening the page, users will be able to either create an account by
clicking the "Sign Up" or log into an existing account with the "Sign In"
button, each of which will open modals with the appropriate fields. After
signing in, the "Sign Up" and "Sign In" buttons will be hidden, and replaced
by "Change Password" and "Sign Out" buttons. The user will be able to change
their password by clicking the "Change Password" button and entering their old
and new passwords.

Users will also be able see an empty tic-tac-toe board after signing in.
Users can then begin playing by clicking on one of the squares. By clicking one
of the squares, the user will be able to mark the square with either X or O
(depending on whose turn it is, which is displayed on the scoreboard at the
bottom of the page). After marking a square with a letter, the user will then
be able to mark a different square with the opposite letter, and continue to
alternate until one player wins or there is a draw (all squares are filled with
no winner). The user will then see an alert telling them the outcome of the
game, and then see a new cleared board. If one player wins, that player's score
will be incremented by 1, and the user will be able to see the current score on
the scoreboard. When finished, the user will be able to click the "Sign Out"
button, which will log their account out of the back-end, hide the board, and
the user will again see the "Sign Up" and "Sign In" buttons on the navbar at
the top of the page.
