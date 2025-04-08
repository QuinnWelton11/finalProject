const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [

    //Row win begin

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    //Row win end

    //Column win start

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    //Column win end

    //Diagnol win start

    [0, 4, 8],

    [2, 4, 6],

    //Diagnol win end
    
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let playing = false;

startGame();


function startGame() {

    cells.forEach(cell => cell.addEventListener("click", clickedCell));

    restartBtn.addEventListener("click", restartGame);

    statusText.textContent = `${currentPlayer}'s turn`;

    playing = true;

}

function computerMove() {

    let emptyCells = [];

    cells.forEach((cell, index) => {

        if (options[index] === "") {

            emptyCells.push(index);

        }

    });

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    const cell = cells[randomIndex];

    updateCell(cell, randomIndex);

    checkWinner();

}

function clickedCell() {

    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !playing){

        return;

    }

    updateCell(this, cellIndex);

    checkWinner();

    if (playing && currentPlayer === "O") {

        setTimeout(computerMove, 150);

    }

}

function updateCell(cell, index) {

    options[index] = currentPlayer;

    cell.textContent = currentPlayer;

}

function changePlayer() {

 currentPlayer = (currentPlayer == "X") ? "O" : "X";

 statusText.textContent = `${currentPlayer}'s turn`;

}

function checkWinner () {

    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {

        const condition = winConditions[i];
        
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){

            continue;

        }

        if(cellA == cellB && cellB == cellC){

            roundWon = true;

            break;

        }

    }

    if(roundWon){

        statusText.textContent = `${currentPlayer} wins!`;

        playing = false;

    } else if(!options.includes("")) {

        statusText.textContent = `It's a Draw!`;

        running = false;

    } else {

        changePlayer();

    }

}

function restartGame() {

    currentPlayer = "X";
    
    options = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = `${currentPlayer}'s turn`;

    cells.forEach(cell => cell.textContent = "");

    playing = true;

}

const music = document.getElementById("background_music");

    music.volume = 0.2;

const toggleBtn = document.getElementById("musicToggle")

toggleBtn.addEventListener("click", () => {

    if (music.muted) {

        music.muted = false;

        toggleBtn.textContent = "🔇";

    } else {

        music.muted = true;
        toggleBtn.textContent = "🔊";

    }

});

document.addEventListener("click", () => {

    if (music.muted) {

        music.muted = false;

    }

    const video = document.querySelector("video");

    if (video && video.paused) {

        video.play().catch(err => {

            console.warn("Video playback failed:", err);

        });

    }

}, { once: true });
