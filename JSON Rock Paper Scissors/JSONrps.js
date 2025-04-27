/*
  Data Storage
  Instruction Practice: Local Storage
  rock pAIper scissors: Script
*/

// #### SETUP ####

// ## Global variable for player stats ##

let playerStats;

// #### PLAYER STATS FUNCTIONS ####

// ## Load player stats from localStorage or use a default if it isn't available ##

function loadPlayerStats() {
    if (localStorage.getItem("RPSPlayerStats")) {
        getPlayerStats();
    } else {
        initializePlayerStats();
    }
}

// ## Save player stats to localStorage ##

function setPlayerStats() {
    localStorage.setItem("RPSPlayerStats", JSON.stringify(playerStats));
}

// ## Get player stats into global variable

function getPlayerStats() {
    playerStats = JSON.parse(localStorage.getItem("RPSPlayerStats"));
}

// ## Create or reset the player stats ##

function initializePlayerStats() {
    playerStats = {
        rock: 0,
        paper: 0,
        scissors: 0,
        wins: 0,
        losses: 0,
        ties: 0,
    };
}

// ## Render the player stats into the DOM ##

function showPlayerStats() {
    document.querySelector("#stats").innerHTML = `
    <table>
      <tr>
        <th>Wins</th><th>Losses</th><th>Ties</th><th>Rock</th><th>Paper</th><th>Scissors</th>
      </tr>
      <tr>
        <td>${playerStats.wins}</td><td>${playerStats.losses}</td><td>${playerStats.ties}</td>
        <td>${playerStats.rock}</td><td>${playerStats.paper}</td><td>${playerStats.scissors}</td>
      </tr>
    </table>
  `;
}

// #### GAME FUNCTIONS ####

// ## Calculate the next computer move based on previous player moves ##

function getComputerMove() {
    const plays = playerStats.rock + playerStats.paper + playerStats.scissors;

    if (plays === 0) {
        return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    }

    const computerChoice = Math.floor(Math.random() * plays);

    if (computerChoice < playerStats.rock) {
        return "paper";
    } else if (computerChoice < playerStats.rock + playerStats.paper) {
        return "scissors";
    } else {
        return "rock";
    }
}

// ## Respond to the player making a move, and update the DOM accordingly ##

function respondToPlayerMove(playerMove) {
    let computerMove = getComputerMove();
    let resultString = `You chose ${playerMove}, computer chose ${computerMove}.\n`;

    playerStats[playerMove] += 1;

    if (playerMove === computerMove) {
        playerStats.ties += 1;
        resultString += "It's a tie, try again!";
    } else if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissors" && computerMove === "paper")
    ) {
        playerStats.wins += 1;
        resultString += "You win, keep going!";
    } else {
        playerStats.losses += 1;
        resultString += "You lose, try again!";
    }

    document.querySelector("#results").innerText = resultString;
    setPlayerStats();
    showPlayerStats();
}

// #### INTERFACE FUNCTIONS ####

// ## Handle user clicking on rock, paper, or scissors ##

function handleChoiceClick(event) {
    if (event.target.classList.contains("choice")) {
        respondToPlayerMove(event.target.id);
    }
}

// ## Handle user requesting game reset ##

function handleResetClick() {
    initializePlayerStats();
    showPlayerStats();
    setPlayerStats();
}

// ## Add handler functions to DOM elements ##

function initializeInterface() {
    const choiceContainer = document.querySelector("#choices");
    choiceContainer.addEventListener("click", handleChoiceClick);

    const resetButton = document.querySelector("#resetButton");
    resetButton.addEventListener("click", handleResetClick);
}

// #### SETUP GAME ####

loadPlayerStats();
showPlayerStats();
initializeInterface();
