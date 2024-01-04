var playerScore = 0;
var computerScore = 0;
var roundsPlayed = 0;
var playerName = "";

function startGame() {
  playerName = document.getElementById("player-name").value;

  if (playerName.trim() === "") {
    alert("Please enter a valid name.");
    return;
  }

  document.getElementById("game-container").style.display = "block";
  document.getElementById("profile-form").style.display = "none";

  // Set the player's name in the scoreboard
  document.getElementById("player-name-display").textContent = playerName;
  document.getElementById("computer-name-display").textContent = "Computer";

  // Call updateScoreboard after setting the player's name
  updateScoreboard();
}

function playGame(playerChoice) {
  var choices = ["rock", "paper", "scissors"];
  var computerChoice = choices[Math.floor(Math.random() * choices.length)];

  var result = "";

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    playerScore++;
  } else {
    result = "Computer wins!";
    computerScore++;
  }

  updateScoreboard();
  showResult(playerChoice, computerChoice, result);
  animateChoices(playerChoice, computerChoice);
  roundsPlayed++;

  if (roundsPlayed === 3) {
    endGame();
  }
}

function updateScoreboard() {
  var playerScoreElement = document.getElementById("player-score-display");
  var computerScoreElement = document.getElementById("computer-score");

  playerScoreElement.textContent = playerName + "'s Score: " + playerScore;
  computerScoreElement.textContent = "Computer: " + computerScore;
}

function showResult(playerChoice, computerChoice, result) {
  var resultElement = document.getElementById("result");

  resultElement.innerHTML = `
    <p>You chose <strong>${playerChoice}</strong>.</p>
    <p>Computer chose <strong>${computerChoice}</strong>.</p>
    <p>${result}</p>
  `;
}

function animateChoices(playerChoice, computerChoice) {
  var animationContainer = document.getElementById("animation-container");
  animationContainer.innerHTML = "";

  var playerChoiceElement = document.createElement("div");
  playerChoiceElement.classList.add("choice-animation", playerChoice + "-animation");
  animationContainer.appendChild(playerChoiceElement);

  var computerChoiceElement = document.createElement("div");
  computerChoiceElement.classList.add("choice-animation", computerChoice + "-animation");
  animationContainer.appendChild(computerChoiceElement);

  setTimeout(function () {
    animationContainer.innerHTML = "";
  }, 1500);
}

function endGame() {
  var resultElement = document.getElementById("result");
  var finalResult = "";

  if (playerScore > computerScore) {
    finalResult = "Congratulations, " + playerName + "! You are the overall winner!";
  } else if (playerScore < computerScore) {
    finalResult = "Sorry, " + playerName + ". Computer is the overall winner.";
  } else {
    finalResult = "It's a tie! " + playerName + ", you and the computer have the same score.";
  }

  resultElement.innerHTML += "<p>" + finalResult + "</p>";
  disableChoices();
}

function disableChoices() {
  var choices = document.getElementsByClassName("choice");

  for (var i = 0; i < choices.length; i++) {
    choices[i].disabled = true;
  }
}