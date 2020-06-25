var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var startButton = document.querySelector("#start")

var secondsElapsed = 0;
var totalSeconds = 0;
var interval; 

//this function runs once a second
function runClockCb(){
    console.log("something");
    
    secondsElapsed++;
    console.log(secondsElapsed);
    
    //change the display
    minutesDisplay.textContent = Math.floor((totalSeconds - secondsElapsed) / 60);
    secondsElapsed.textContent = (totalSeconds - secondsElapsed) % 60;
}

// GIVEN I am taking a code quiz
// WHEN I click the start button
function startTimer(){
    //write code to start the timer here
    var minutes = 5;
    totalSeconds = minutes * 60;
    //set time using totalSeconds
    secondsElapsed = 0;
    if(typeof interval !=="undefined"){
        // if we have an interval we want to clear it
        clearInterval(interval);
    }
    // keep track of our interval
    interval = setInterval(runClockCb, 1000);
}

startButton.addEventListener("click", startTimer);
// THEN a timer starts and I am presented with a question
// create a list of questions and answers
var questionList = [
    {
        "question": "What happens once every 4 years?",
        "a": "Lunar Eclipse.",
        "b": "Supreme Court Election.",
        "c": "Category 3 Hurricanes.",
        "d": "Leap Day.",
        "correct": "d",
        "userAnswer": null
    },
    {
        "question": "What month is the Vernal Equinox?",
        "a": "February",
        "b": "April",
        "c": "March",
        "d": "July",
        "correct": "c",
        "userAnswer": null
    }
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
var score = document.body.querySelector("#score");

var questionIndex = 0;
var Index = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var userAnswer = 0;

function buttonHandler(event) {
    var button = event.target;
    var userAnswer = button.getAttribute("data-answer");
    var questionId = parseInt(button.getAttribute("data-question"));
    questionList[questionId]["userAnswer"] = userAnswer;

    if(questionList[questionId]["userAnswer"] === questionList[questionId]["correct"]){
        score.textContent = "You got it correct";
        setTimeout(function(){
            questionIndex++;
            initializeQuestion();
            score.textContent= "";
        }, 5000);
    }
    else{
        score.textContent = "You got it wrong";
        setTimeout(function(){
            questionIndex++;
            initializeQuestion();
            score.textContent= "";
        }, 5000);
    }
}

buttonA.addEventListener("click",buttonHandler);
buttonB.addEventListener("click",buttonHandler);
buttonC.addEventListener("click",buttonHandler);
buttonD.addEventListener("click",buttonHandler);

function initializeQuestion(){
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

// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score 