//create a function to append high score to html page

function getHighScore() {
  var scoreList = JSON.parse(localStorage.getItem("highscore")) || [];
  console.log(scoreList);
  scoreList.sort(function (a, b) {
    return b.numCorrect - a.numCorrect;
  });
  var i;
  for (i = 0; i < scoreList.length; i++) {
    var scoreObj = scoreList[i];
    var newLi = document.createElement("li");
    newLi.innerText = scoreObj.score + " " + scoreObj.initials;
    document.querySelector("#top-scores").appendChild(newLi);
  }
  // sort the high scores.
}

//local storage get item (scores)

//function to clear storage
function clearStorage() {
  // console.log("clearstorage hit");
  localStorage.removeItem("highscore");
  location.reload();
}
//added event listener for clear scores
document.getElementById("clearScores").addEventListener("click", clearStorage);
getHighScore();
