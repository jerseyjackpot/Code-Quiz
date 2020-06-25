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
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var playButton = document.querySelector("#button");
var QuestionElements = document.querySelector("#questions");
var AnswersElements = document.querySelector("#answers");
var NameInput = document.querySelector("#name");
var ScoreInput = document.querySelector("#score");

var Index = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var userAnswer = 0;


function runClockCb() {
    secondsElapsed++;
    minutesDisplay.textContent = Math.floor((totalSeconds - secondsElapsed) / 60)
    secondsDisplay.textContent = (totalSeconds - secondsElapsed) % 60;

}


function startTimer() {

    var minutes = 10;
    totalSeconds = minutes * 60;
    console.log(totalSeconds)
    secondsElapsed = 0;
    if (typeof interval !== 'undefined') {
        (clearInterval(interval));
    }

    interval = setInterval(runClockCb, 1000);
    DisplayQuestions();
}

timerButton.addEventListener("click", startTimer);