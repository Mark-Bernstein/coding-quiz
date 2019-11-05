# coding-quiz
Motivation

This is a code quiz which tests a user's knowledge of basic JavaScript concepts. The application was built as part of a project for the UCSD web development bootcamp program. The quiz is multiple-choice and relies on a timer to determine how well the user performs when taking the quiz. The timer starts after the start button is clicked. Starting at and counting down from 75 seconds, if time the user submits the wrong answer, 15 seconds (also later saved as the user's score) are deducted from the countdown clock. The application also uses local storage to store the user's score to the browser so that when the user returns, they can track pervious quiz attempts and try to beat their high score.

Code style

The program is written in native JavaScript.

A timer-based quiz application that stores high scores client-side

Play proceeds as follows:

-The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.

-Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.

-Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

-When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in localStorage.

Functional, deployed application.
The first view of the application displays a button that starts the quiz.
Clicking the start button displays a series of questions.
Once the quiz begins, a timer starts.
If a question is answered incorrectly, additional time is subtracted from the timer.
The timer stops when all questions have been answered or the timer reaches 0.
After the game ends, the user can save their initials and score to a highscores view using local storage.

No installation necessary. Project is hosted here: https://mark-bernstein.github.io/coding-quiz/
