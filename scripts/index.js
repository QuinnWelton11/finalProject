const cells = document.querySelectorAll(".cell");

const statusText = document.querySelector(".statusText");

const difficultyLevel = document.getElementById("difficultyLevel");

let difficulty = "normal";

const difficultyDesc = document.getElementById("difficultyDesc");

const difficultyDescriptions = {

    easy: "I don't want a challenge...",

    normal: "I like a good challenge!",

    hard: "I want a worthy opponent!",

    legendary: "The bots will fear me!"

};

difficultyLevel.addEventListener("change", () => {

    difficulty = difficultyLevel.value;

    difficultyDesc.textContent = difficultyDescriptions[difficulty];

});

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

    let randomChance;

    if (difficulty === "easy") {

        randomChance = 0.45;

    } else if (difficulty === "normal") {

        randomChance = 0.6;

    } else if (difficulty === "hard") {

        randomChance = 0.7;

    } else {

        randomChance = 1.0;

    }

    const randomRoll = Math.random();

    console.log(`Difficulty: ${difficulty}, Random chance: ${randomChance}, Rolled: ${randomRoll}`);


    if (randomRoll < randomChance) {
    
        for (let condition of winConditions) {

            const [a, b, c] = condition;

            const gridLine = [options[a], options[b], options[c]];

            if (gridLine.filter(val => val === "O").length == 2 && gridLine.includes("")) {

                const emptyCell = condition[gridLine.indexOf("")];

                updateCell(cells[emptyCell], emptyCell);

                checkWinner();

                return;

            }

        }

    

        for (let condition of winConditions) {

            const [a, b, c] = condition;

            const gridLine = [options[a], options[b], options[c]]; 

            if (gridLine.filter(val => val === "X").length == 2 && gridLine.includes("")) {

                const emptyCell = condition[gridLine.indexOf("")];

                updateCell(cells[emptyCell], emptyCell);

                checkWinner();

                return;

            }

        }    

        if (options[4] === "") {

            updateCell(cells[4], 4);

            checkWinner();

            return;

        }

        const player = "X";

        if ((options[0] === player && options[8] === player && options[4] === "O") || (options[2] === player && options[6] === player && options[4] === "O")) {

            const gridEdges = [1, 3, 5, 7];

            const gridEdge = gridEdges.find(index => options[index] === "");

            if (gridEdge !== undefined) {

                updateCell(cells[gridEdge], gridEdge);

                checkWinner();

                return;

            }

        }

        const gridCorners = [0, 2, 6, 8];

        const emptyCorner = gridCorners.find(index => options[index] === "");

        if (emptyCorner !== undefined) {

            updateCell(cells[emptyCorner], emptyCorner);

            checkWinner();

            return;

        }
    }

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

        playing = false;

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

const video = document.getElementById("backgroundVideo");

const mediaToggle = document.getElementById("mediaToggle");

music.volume = 0.2;

video.load();

mediaToggle.addEventListener("click", () => {

    if (music.paused) {

        music.play()

        video.play()

        mediaToggle.innerText = "🔇";

    } else {

        music.pause()

        video.pause()

        mediaToggle.innerText = "🔊";

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
