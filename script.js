const gameBoard =
    document.getElementById("game-board");

const scoreElement =
    document.getElementById("score");

const livesElement =
    document.getElementById("lives");

const timerElement =
    document.getElementById("timer");

const targetElement =
    document.getElementById("target-direction");

const messageElement =
    document.getElementById("message");

const startButton =
    document.getElementById("start-button");


const directions = [

    {
        name: "UP",
        symbol: "⬆️"
    },

    {
        name: "DOWN",
        symbol: "⬇️"
    },

    {
        name: "LEFT",
        symbol: "⬅️"
    },

    {
        name: "RIGHT",
        symbol: "➡️"
    }

];


let score = 0;

let lives = 3;

let time = 30;

let targetDirection;

let gameRunning = false;

let timerInterval;


/* Start Game */

startButton.addEventListener(
    "click",
    startGame
);


function startGame() {

    score = 0;

    lives = 3;

    time = 30;

    gameRunning = true;

    scoreElement.textContent =
        score;

    livesElement.textContent =
        lives;

    timerElement.textContent =
        time;

    startButton.textContent =
        "Restart Game";

    messageElement.innerHTML =
        'Find the arrow pointing: <strong id="target-direction">UP</strong>';

    startTimer();

    createPuzzle();

}


/* Timer */

function startTimer() {

    clearInterval(timerInterval);

    timerInterval =
        setInterval(() => {

            time--;

            timerElement.textContent =
                time;

            if (time <= 0) {

                endGame(
                    "⏰ Time's Up!"
                );

            }

        }, 1000);

}


/* Create Puzzle */

function createPuzzle() {

    gameBoard.innerHTML = "";

    const randomTarget =
        Math.floor(
            Math.random() *
            directions.length
        );

    targetDirection =
        directions[randomTarget];

    targetElement.textContent =
        targetDirection.name;


    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const randomDirection =
            directions[
                Math.floor(
                    Math.random() *
                    directions.length
                )
            ];


        const button =
            document.createElement(
                "button"
            );


        button.classList.add(
            "arrow"
        );


        button.textContent =
            randomDirection.symbol;


        button.dataset.direction =
            randomDirection.name;


        button.addEventListener(
            "click",
            handleArrowClick
        );


        gameBoard.appendChild(
            button
        );

    }

}


/* Handle Arrow Click */

function handleArrowClick(event) {

    if (!gameRunning) {

        return;

    }


    const clickedArrow =
        event.currentTarget;


    const clickedDirection =
        clickedArrow.dataset.direction;


    if (
        clickedDirection ===
        targetDirection.name
    ) {

        /* Correct */

        score += 10;

        scoreElement.textContent =
            score;


        clickedArrow.classList.add(
            "correct"
        );


        setTimeout(
            createPuzzle,
            200
        );


    } else {

        /* Wrong */

        lives--;

        livesElement.textContent =
            lives;


        clickedArrow.classList.add(
            "wrong"
        );


        setTimeout(() => {

            clickedArrow.classList.remove(
                "wrong"
            );

        }, 300);


        if (lives <= 0) {

            endGame(
                "💀 Game Over!"
            );

        }

    }

}


/* End Game */

function endGame(
    message
) {

    gameRunning = false;

    clearInterval(
        timerInterval
    );


    messageElement.innerHTML =
        `${message}<br>
        Final Score:
        <strong>${score}</strong>`;


    gameBoard.innerHTML = "";


    startButton.textContent =
        "Play Again";

}
