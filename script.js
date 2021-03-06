var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var startButton = document.querySelector("#start");
var mainContent = document.querySelector("#main-content");
var answer = document.querySelector("answer");

var secondsElapsed = 0;
var totalSeconds = 0;
var interval;
var numCorrect = 0;
var timerID;
var submitButton = document.querySelector("submitButton");
var scoreInput = {
  score: numCorrect,
  initials: initials,
};

//this function runs once a second
function runClockCb() {
  //seconds in console
  secondsElapsed++;
  console.log(secondsElapsed);

  //change the display
  minutesDisplay.textContent = Math.floor((totalSeconds - secondsElapsed) / 60);
  secondsDisplay.textContent = (totalSeconds - secondsElapsed) % 60;

  //stop clock when it hits zero
  if (totalSeconds === 0) {
    clearTimeout(timerID);
  }
}

// WHEN I click the start button
function startTimer() {
  //code to start the timer here
  document.getElementById("main-content").style.display = "block";
  document.getElementById("start").style.display = "none";
  var minutes = 5;
  totalSeconds = minutes * 60;

  //set time using totalSeconds
  secondsElapsed = 0;
  if (typeof interval !== "undefined") {
    // if we have an interval we want to clear it
    clearInterval(interval);
  }

  // keep track of our interval
  timerID = setInterval(runClockCb, 1000);
}

//event listener for start button
startButton.addEventListener("click", startTimer);

// list of questions and answers
var questionList = [
  {
    question: "What happens once every 4 years?",
    a: "Lunar Eclipse.",
    b: "Supreme Court Election.",
    c: "Category 3 Hurricanes.",
    d: "Leap Day.",
    correct: "d",
    userAnswer: null,
  },
  {
    question: "What month is the Vernal Equinox?",
    a: "February",
    b: "April",
    c: "March",
    d: "July",
    correct: "c",
    userAnswer: null,
  },
  {
    question: "How far is the Moon from Earth?",
    a: "2389 miles",
    b: "22389 miles",
    c: "35000 miles",
    d: "238900 miles",
    correct: "d",
    userAnswer: null,
  },
  {
    question: "Jupiter has how many moons?",
    a: "2",
    b: "None",
    c: "79",
    d: "25",
    correct: "c",
    userAnswer: null,
  },
  {
    question: "What is the Sun mostly made of?",
    a: "Hydrogen",
    b: "Carbon",
    c: "Helium",
    d: "Oxygen",
    correct: "a",
    userAnswer: null,
  },
];

//tags for query selectors
var questionTag = document.body.querySelector("#question");
var answerTagA = document.body.querySelector("#answer-a");
var answerTagB = document.body.querySelector("#answer-b");
var answerTagC = document.body.querySelector("#answer-c");
var answerTagD = document.body.querySelector("#answer-d");

var buttonA = document.body.querySelector("#button-a");
var buttonB = document.body.querySelector("#button-b");
var buttonC = document.body.querySelector("#button-c");
var buttonD = document.body.querySelector("#button-d");
var answer = document.body.querySelector("#answer");
var highscoreDiv = document.querySelector("#highscore");
var resultsScore = document.body.querySelector("results");

//variables for timers
var questionIndex = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var userAnswer = 0;
var stopTimer = null;

//button handler for answering questions
function buttonHandler(event) {
  var button = event.target;
  if (!button.disabled) {
    var userAnswer = button.getAttribute("data-answer");
    var questionId = parseInt(button.getAttribute("data-question"));
    questionList[questionId]["userAnswer"] = userAnswer;
    //to disable buttons between questions
    buttonA.disabled = true;
    buttonB.disabled = true;
    buttonC.disabled = true;
    buttonD.disabled = true;
    //if correct answer is selected
    if (
      questionList[questionId]["userAnswer"] ===
      questionList[questionId]["correct"]
    ) {
      answer.textContent = "You got it correct";
      questionIndex++;
      numCorrect++;
    }
    // WHEN I answer a question incorrectly
    // THEN time is subtracted from the clock
    else {
      answer.textContent = "You got it wrong";
      //setTimeout(function () {
      questionIndex++;
      totalSeconds -= 60;
    }

    // WHEN all questions are answered, stop the timer
    if (questionIndex >= questionList.length) {
      console.log("condition hit!");
      clearInterval(timerID);

      // show the score
      document.getElementById("scoreInput").style.display = "block";
      // document.getElementById("submitButton").style.display = "none";
      console.log("final score " + numCorrect);
      document.getElementById("gameOverScore").innerText =
        "You got " + numCorrect + " out of 5!";
    } else {
      setTimeout(function () {
        answer.textContent = " ";
        initializeQuestion();
      }, 3000);
    }
  }
}
// answer.textContent = " ";
// if (questionIndex >= questionList.length) {
// clearInterval(timerID);
// show the score
// document.getElementById("scoreInput").style.display = "block";
// document.getElementById("submitButton").style.display = "none";
// console.log("final score " + numCorrect);
// document.getElementById("gameOverScore").innerText="You got " + numCorrect + " out of 5!";
// } else {
//   setTimeout(function () {
//     answer.textContent = " ";
//     initializeQuestion();
//   }, 3000);

// WHEN I answer a question
// THEN I am presented with another question
function initializeQuestion() {
  console.log(questionList[questionIndex]);
  var wholeObj = questionList[questionIndex];
  var question = wholeObj.question;
  questionTag.textContent = question;
  questionTag.setAttribute("data-question", questionIndex);

  buttonA.disabled = false;
  buttonB.disabled = false;
  buttonC.disabled = false;
  buttonD.disabled = false;

  answerTagA.textContent = wholeObj.a;
  answerTagB.textContent = wholeObj.b;
  answerTagC.textContent = wholeObj.c;
  answerTagD.textContent = wholeObj.d;
  buttonA.setAttribute("data-question", questionIndex);
  buttonB.setAttribute("data-question", questionIndex);
  buttonC.setAttribute("data-question", questionIndex);
  buttonD.setAttribute("data-question", questionIndex);
}
initializeQuestion();
//button handlers for each answer choice
buttonA.addEventListener("click", buttonHandler);
buttonB.addEventListener("click", buttonHandler);
buttonC.addEventListener("click", buttonHandler);
buttonD.addEventListener("click", buttonHandler);

//function that houses object to save high score and initials to local storage
// object

//create input for name dynamically
// get value of input box

var inputInitials = document.getElementById("initials");
function saveScore() {
  var initials = inputInitials.value.trim();
  if (initials !== " ") {
    var scoreList = JSON.parse(window.localStorage.getItem("highscore")) || [];
    var score = numCorrect;
    var scoreInput = {
      score: numCorrect,
      initials: initials,
    };
    scoreList.push(scoreInput);
    // save to local storage
    window.localStorage.setItem("highscore", JSON.stringify(scoreList));
    window.location.href = "highscore.html";
  }
}
var submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", saveScore);
