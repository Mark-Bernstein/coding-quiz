var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings",
      "booleans",
      "alerts",
      "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes",
      "curly brackets",
      "parentheses",
      "square brackets"],
    answer: "parentheses"
  },
  {
    title: "What does HTML stands for?",
    choices: ["Hypertext Machine Language",
      "Hypertext and links markup language",
      "Hypertext Markup Language",
      "Hightext Machine Language"],
    answer: "Hypertext Markup Language"
  },
  {
    title: "Which of the following type of variable is visible only within a function where it is defined?",
    choices: ["Global variable",
      "Local variable",
      "Both of the above",
      "Noth of the above"],
    answer: "Local variable"
  },
  {
    title: "Which of the following HTML element is used for creating an unordered list?",
    choices: ["<ui>",
      "<i>",
      "<em>",
      "<ul>"],
    answer: "<ul>"
  }
];


//select all elements
var startContainer = document.getElementById("startContainer");
var startButton = document.querySelector("#btnStart");
var navTimer = document.getElementById("navTimer");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var choice = document.getElementById("choice");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var scoreContainer = document.getElementById("scoreContainer");
var highscores = document.getElementById("highscores");
var finalScore = document.getElementById("finalScore");
var enterInitials = document.getElementById("enterInitials");
var submitBtn = document.getElementById("submitBtn");
var viewHighscores = document.getElementById("highScores");
var goBack = document.getElementById("goBack");
var clearHighscores = document.getElementById("clearHighscores");
var highscoresHeader = document.getElementById("highscoresHeader");
var navHighscores = document.getElementById("navHighscores");
var navBar = document.getElementById("navBar");
var highscoresList = document.getElementById("highscoresList");
var initialsText = document.getElementById("initialsText");

var scoreCounter = localStorage.getItem("scoreCounter");

//create elements
var choiceAButton = document.createElement("p");
var choiceBButton = document.createElement("p");
var choiceCButton = document.createElement("p");
var choiceDButton = document.createElement("p");
var goBackButton = document.createElement("button");
var clearHighscoresButton = document.createElement("button");

//create all variables
var lastQuestionIndex = 5;
var currentQuestionIndex = 0;
var currentQuestion = questions[currentQuestionIndex];
var timeLeft = 75; // 75 seconds
var score;
var TIMER = setInterval(timeLeft, 1000); //1000ms = 1s
var timerInterval;
var highscoresArray = JSON.parse(localStorage.getItem("highscoresArray")) || [] ;



//STARTS QUIZ BY CLICKING BUTTON
startButton.addEventListener("click", startTimer);

//start countdown timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeleft = 75;
    timeLeft--;
    navTimer.textContent = "Time: " + timeLeft;
  }, 1000);
  startContainer.style.display = "none";
  quiz.style.display = "block";
  renderQuestions();
}

function stopTimer() {
  clearTimeout(timerInterval);
  navTimer.textContent = "Time: " + timeLeft;
}

function renderQuestions() {
  currentQuestion = questions[currentQuestionIndex];
  question.textContent = currentQuestion.title;
  choiceAButton.textContent = currentQuestion.choices[0];
  choiceA.appendChild(choiceAButton);
  choiceBButton.textContent = currentQuestion.choices[1];
  choiceB.appendChild(choiceBButton);
  choiceCButton.textContent = currentQuestion.choices[2];
  choiceC.appendChild(choiceCButton);
  choiceDButton.textContent = currentQuestion.choices[3];
  choiceD.appendChild(choiceDButton);
}

function checkAnswer(userAnswer) {
  if (userAnswer == currentQuestion.answer) {
    // do nothing, go to next question
    currentQuestionIndex++;
    if (currentQuestionIndex == lastQuestionIndex) {
      console.log("going to scorerender() now!");
      scoreRender();
      return;
    }
    renderQuestions();
  } else {
    //if user is wrong take away 15 seconds(score) from timeLeft
    timeLeft = timeLeft - 15;
    currentQuestionIndex++;
    if (currentQuestionIndex == lastQuestionIndex) {
      console.log("going to scorerender() now!");
      scoreRender();
      return;
    }
    renderQuestions();
  }
}

function scoreRender() {
  stopTimer();
  quiz.style.display = "none";
  scoreContainer.style.display = "block";
  allDone.style.display = "block";
  finalScore.style.display = "block";
  enterInitials.style.display = "block";
  submitBtn.style.display = "block";
  finalScore.innerHTML += " " + timeLeft;
  initialsText.style.display = "block";
  console.log("currently in scoreRender()");
}

//viewHighscores.addEventListener("click", initHighscores);

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  console.log("I am inside the highscores page!");
  var initialsInput = initialsText.value.trim();
  // var objHighscores = [
  //   {
  //     //name: initialsInput,
  //     score: timeLeft
  //   }];

  // Return from function early if submitted initialsText is blank
  if (initialsInput === "") {
    return;
  }

  // Add new initialsText to initials array, clear the input
  highscoresArray.push(initialsInput + "   ------- Score: " + timeLeft);
  
  //initialsText.value = "";
  console.log("about to call storeHighscores");
  storeHighscores();
  console.log("finished storeHighscores(), about to call initHighscores()");
  initHighscores();
  console.log("finished calling initHighscores()");
});

function scoreRenderDisplayOff() {
  scoreContainer.style.display = "none";
  allDone.style.display = "none";
  finalScore.style.display = "none";
  enterInitials.style.display = "none";
  initialsText.style.display = "none";
  submitBtn.style.display = "none";
}

goBack.textContent = "Go Back";
clearHighscores.textContent = "Clear Highscores";

goBackButton.textContent = "Go Back";
clearHighscoresButton.textContent = "Clear Highscores";


function initHighscores() {
  scoreRenderDisplayOff();
  navTimer.style.display = "none";
  scoreContainer.style.display = "none";
  highscores.style.display = "block";
  highscoresHeader.style.display = "block";
  goBack.style.display = "inline-block";
  clearHighscores.style.display = "inline-block";

  goBack.textContent = "Go Back";
  clearHighscores.textContent = "Clear Highscores";

  console.log("About to call init()");
  init();
  console.log("Finished calling init()");
}

function renderHighscores(highScoresArr) {
  highscoresList.innerHTML = "";
  console.log ("high scores array in render highscore: ", highScoresArr);
  // Render a new li for each highscore
  for (var i = 0; i < highScoresArr.length; i++) {
    var highscoresItem = highScoresArr[i];

    var li = document.createElement("li");

    li.textContent = highscoresItem;
    li.setAttribute("data-index", i);

    highscoresList.appendChild(li);
  }
}
var storedHighscores;
function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object;
  storedHighscores = JSON.parse(localStorage.getItem("highscoresArray"));

  // If highsores were retrieved from localStorage, update the highscores array to it
  if (storedHighscores !== null) {
    //highscoresArray = storedHighscores;
    console.log("highscore array is: ", highscoresArray);
  }

  // Render todos to the DOM
  console.log("About to call renderHighscores()");
  renderHighscores(highscoresArray);
  console.log("finished calling renderHighscores())");
}

function storeHighscores() {
  localStorage.setItem("highscoresArray", JSON.stringify(highscoresArray));
}

clearHighscores.addEventListener("click", function (event) {
  event.preventDefault();
  highscoresArray = [];
  storeHighscores = [];

  for (var i = 0; i < highscoresArray.length; i++) {
     highscoresArray = highscoresArray.pop();
     storedHighscores = storeHighscores.pop();
 }
  localStorage.clear();
  renderHighscores(highscoresArray);
});

goBack.addEventListener("click", function (event) {
  event.preventDefault();

  window.location.reload();
});

navHighscores.addEventListener("click", function (event) {
  event.preventDefault();

  startContainer.style.display = "none";
  scoreRenderDisplayOff();
  navTimer.style.display = "none";
  scoreContainer.style.display = "none";
  highscores.style.display = "block";
  highscoresHeader.style.display = "block";

  goBack.style.display = "inline-block";
  clearHighscores.style.display = "inline-block";
  goBack.textContent = "Go Back";
  clearHighscores.textContent = "Clear Highscores";
  init();
});
