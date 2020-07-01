//create a function to append high score to html page
function getHighScore (){
    var scoreList = JSON.parse(localStorage.getItem(scoreList)) || [];
    // sort the high scores. 
        scoreList.sort(function(a, b) {
            return b.numCorrect - a.numCorrect;
        });
}
//local storage get item (scores)

//function to clear storage
// .removeItem("scoreList");
// location.reload();

// document.getElementById("clearScore").onClick = clearStorage;

//invoke function to het highScore
// functionname();