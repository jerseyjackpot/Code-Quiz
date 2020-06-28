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

//this function runs once a second
function runClockCb() {
  //seconds in console
  secondsElapsed++;
  console.log(secondsElapsed);

  //change the display
  minutesDisplay.textContent = Math.floor((totalSeconds - secondsElapsed) / 60);
  secondsDisplay.textContent = (totalSeconds - secondsElapsed) % 60;

  if (totalSeconds === 0) {
    clearTimeout(timerID);
  };

}

// GIVEN I am taking a code quiz
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

startButton.addEventListener("click", startTimer);

// THEN a timer starts and I am presented with a question
// create a list of questions and answers
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

var questionIndex = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var userAnswer = 0;
var stopTimer = clearInterval(interval);

function buttonHandler(event) {
  var button = event.target;
  var userAnswer = button.getAttribute("data-answer");
  var questionId = parseInt(button.getAttribute("data-question"));
  questionList[questionId]["userAnswer"] = userAnswer;

  if (
    questionList[questionId]["userAnswer"] ===
    questionList[questionId]["correct"]
  ) {
    answer.textContent = "You got it correct";
    setTimeout(function () {
      questionIndex++;
      numCorrect++;
      answer.textContent = " ";
      // WHEN all questions are answered, stop the timer
      if (questionList === undefined) {
        stopTimer(timerID);
      } else {
        answer.textContent = " ";
        initializeQuestion();
      }
    }, 3000);
  }

  // WHEN I answer a question incorrectly
  // THEN time is subtracted from the clock
  else {
    answer.textContent = "You got it wrong";
    setTimeout(function () {
      questionIndex++;
      totalSeconds -= 60;
      answer.textContent = " ";
      initializeQuestion();
    }, 3000);
  }
}

// WHEN I answer a question
// THEN I am presented with another question

function initializeQuestion() {
  console.log(questionList[questionIndex]);
  var wholeObj = questionList[questionIndex];
  var question = wholeObj.question;
  questionTag.textContent = question;
  questionTag.setAttribute("data-question", questionIndex);

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

buttonA.addEventListener("click", buttonHandler);
buttonB.addEventListener("click", buttonHandler);
buttonC.addEventListener("click", buttonHandler);
buttonD.addEventListener("click", buttonHandler);

// THEN I can save my initials and score

//removing elements to show how many correct out of 5
// function removeElement(questionIndex) {
//   // Removes an element from the document
//   var element = document.getElementById(questionList);
//   element.parentNode.removeChild(questionIndex);
//   element.appendChild(numCorrect);

    