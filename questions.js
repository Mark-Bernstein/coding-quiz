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
var start = document.getElementById("startContainer");
var startButton = document.querySelector("#btnStart");
var timer = document.getElementById("timer");
var scoreCounter = localStorage.getItem("scoreCounter");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var choice = document.getElementById("choice");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var scoreContainer = document.getElementById("scoreContainer");

var choiceAButton = document.createElement("p");
var choiceBButton = document.createElement("p");
var choiceCButton = document.createElement("p");
var choiceDButton = document.createElement("p");

//STARTS QUIZ BY CLICKING BUTTON
startButton.addEventListener("click", startTimer);

//create all variables
var lastQuestionIndex = questions.length - 1;
var currentQuestionIndex = 0;
var currentQuestion = questions[currentQuestionIndex];
var timeLeft = 75; // 75 seconds
var score;
var TIMER = setInterval(timeLeft, 1000); //1000ms = 1s
var timerInterval;
//start countdown timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;

    // if(timeLeft === 0) {
    //   score = timeLeft;
    //   clearInterval(timerInterval);
    // }
  }, 1000);
  startContainer.style.display = "none";
  quiz.style.display = "block";
  renderQuestions();
}

function stopTimer() {
  clearTimeout(timerInterval);
  timer.textContent = "Time: " + timeLeft;
}

function renderQuestions() {
  currentQuestion = questions[currentQuestionIndex];
  
  question.innerHTML = currentQuestion.title;

  choiceAButton.textContent = currentQuestion.choices[0];
  choiceA.appendChild(choiceAButton);

  choiceBButton.textContent = currentQuestion.choices[1];
  choiceB.appendChild(choiceBButton);

  choiceCButton.textContent = currentQuestion.choices[2];
  choiceC.appendChild(choiceCButton);

  choiceDButton.textContent = currentQuestion.choices[3];
  choiceD.appendChild(choiceDButton);
}

// checkAnwer
function checkAnswer(userAnswer) {
  //if user is correct
  if (userAnswer == currentQuestion.answer) {
    // do nothing, go to next question
    //alert("Correct!");
    currentQuestionIndex++;
    renderQuestions();
  } else {
    //if user is wrong
    //alert("Incorrect!");
    //take away 15 seconds(score) from timeLeft
    timeLeft = timeLeft - 15;
    currentQuestionIndex++;
    renderQuestions();
  }

  if (currentQuestionIndex == lastQuestionIndex) {
    scoreRender();
  }
}

function scoreRender() {
  //timer.style.display = "none";
  quiz.style.display = "none";
  stopTimer();
  //clearInterval(timer);
  //timer = null;
  scoreContainer.style.display = "block";
  scoreContainer.innerHTML += "<h2>" + "All done!" + "</h2>"
  scoreContainer.innerHTML += "<p>" + "Your final score is " + timeLeft + "." + "</p>";
  scoreContainer.innerHTML += "<p>" + "Enter initials:" + "</p>";
  scoreContainer.innerHTML += "<textarea>" + "</textarea>";
  scoreContainer.innerHTML += "<button>" + "Submit" + "</button>";
}

// localStorage.setItem("scoreCounter", scoreCounter);

