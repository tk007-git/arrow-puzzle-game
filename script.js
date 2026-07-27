const board =
    document.getElementById(
        "gameBoard"
    );


const movesDisplay =
    document.getElementById(
        "moves"
    );


const levelDisplay =
    document.getElementById(
        "levelNumber"
    );


const difficultyDisplay =
    document.getElementById(
        "difficulty"
    );


const message =
    document.getElementById(
        "message"
    );


const gameOver =
    document.getElementById(
        "gameOver"
    );


const levelComplete =
    document.getElementById(
        "levelComplete"
    );


const hintButton =
    document.getElementById(
        "hintButton"
    );


const restartButton =
    document.getElementById(
        "restartButton"
    );


const tryAgainButton =
    document.getElementById(
        "tryAgainButton"
    );


const nextLevelButton =
    document.getElementById(
        "nextLevelButton"
    );


/* GAME VARIABLES */

const SIZE = 8;

let level = 1;

let moves = 0;

let lives = 3;

let hints = 2;

let arrows = [];


/* LEVEL DATA */


/*
    x = column
    y = row

    direction:
    up
    down
    left
    right
*/


const levels = [

    [

        {
            x: 0,
            y: 0,
            direction: "right"
        },

        {
            x: 1,
            y: 0,
            direction: "down"
        },

        {
            x: 1,
            y: 1,
            direction: "right"
        },

        {
            x: 2,
            y: 1,
            direction: "down"
        },

        {
            x: 2,
            y: 2,
            direction: "right"
        },

        {
            x: 3,
            y: 2,
            direction: "down"
        },

        {
            x: 3,
            y: 3,
            direction: "right"
        },

        {
            x: 4,
            y: 3,
            direction: "down"
        },

        {
            x: 4,
            y: 4,
            direction: "left"
        },

        {
            x: 3,
            y: 4,
            direction: "down"
        },

        {
            x: 3,
            y: 5,
            direction: "left"
        },

        {
            x: 2,
            y: 5,
            direction: "down"
        },

        {
            x: 2,
            y: 6,
            direction: "right"
        },

        {
            x: 3,
            y: 6,
            direction: "down"
        },

        {
            x: 3,
            y: 7,
            direction: "right"
        },

        {
            x: 4,
            y: 7,
            direction: "up"
        },

        {
            x: 5,
            y: 7,
            direction: "up"
        },

        {
            x: 5,
            y: 6,
            direction: "left"
        },

        {
            x: 4,
            y: 6,
            direction: "up"
        },

        {
            x: 4,
            y: 5,
            direction: "right"
        },

        {
            x: 5,
            y: 5,
            direction: "up"
        },

        {
            x: 5,
            y: 4,
            direction: "right"
        },

        {
            x: 6,
            y: 4,
            direction: "up"
        },

        {
            x: 6,
            y: 3,
            direction: "left"
        },

        {
            x: 5,
            y: 3,
            direction: "up"
        },

        {
            x: 5,
            y: 2,
            direction: "right"
        },

        {
            x: 6,
            y: 2,
            direction: "up"
        },

        {
            x: 6,
            y: 1,
            direction: "left"
        },

        {
            x: 5,
            y: 1,
            direction: "up"
        },

        {
            x: 5,
            y: 0,
            direction: "left"
        }

    ]

];


/* START GAME */

function startGame() {

    moves = 0;

    lives = 3;

    arrows =
        JSON.parse(
            JSON.stringify(
                levels[0]
            )
        );


    updateUI();

    drawBoard();

}


/* DRAW BOARD */

function drawBoard() {

    board.innerHTML = "";


    /* CREATE EMPTY CELLS */

    for (
        let y = 0;
        y < SIZE;
        y++
    ) {

        for (
            let x = 0;
            x < SIZE;
            x++
        ) {

            const cell =
                document.createElement(
                    "div"
                );

            cell.className =
                "cell";

            cell.dataset.x =
                x;

            cell.dataset.y =
                y;

            board.appendChild(
                cell
            );

        }

    }


    /* CREATE ARROWS */

    arrows.forEach(
        (arrow, index) => {

            const cell =
                document.querySelector(
                    `.cell[data-x="${arrow.x}"][data-y="${arrow.y}"]`
                );


            if (!cell) {

                return;

            }


            const arrowElement =
                document.createElement(
                    "div"
                );


            arrowElement.className =
                `arrow ${arrow.direction}`;


            arrowElement.dataset.index =
                index;


            arrowElement.addEventListener(
                "click",
                () => {

                    clickArrow(
                        index,
                        arrowElement
                    );

                }
            );


            cell.appendChild(
                arrowElement
            );

        }
    );

}


/* CLICK ARROW */

function clickArrow(
    index,
    element
) {

    const arrow =
        arrows[index];


    if (!arrow) {

        return;

    }


    /* CHECK IF PATH IS CLEAR */

    if (
        !isPathClear(
            arrow
        )
    ) {

        loseLife();

        message.textContent =
            "🚫 This arrow is blocked!";

        element.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-8px)"
                },

                {
                    transform:
                        "translateX(8px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],
            {
                duration:
                    250
            }
        );

        return;

    }


    /* ARROW CAN ESCAPE */

    moves++;

    updateUI();


    const distance =
        500;


    if (
        arrow.direction ===
        "left"
    ) {

        element.style.setProperty(
            "--move-x",
            `-${distance}px`
        );

        element.style.setProperty(
            "--move-y",
            "0px"
        );

    }


    if (
        arrow.direction ===
        "right"
    ) {

        element.style.setProperty(
            "--move-x",
            `${distance}px`
        );

        element.style.setProperty(
            "--move-y",
            "0px"
        );

    }


    if (
        arrow.direction ===
        "up"
    ) {

        element.style.setProperty(
            "--move-x",
            "0px"
        );

        element.style.setProperty(
            "--move-y",
            `-${distance}px`
        );

    }


    if (
        arrow.direction ===
        "down"
    ) {

        element.style.setProperty(
            "--move-x",
            "0px"
        );

        element.style.setProperty(
            "--move-y",
            `${distance}px`
        );

    }


    element.classList.add(
        "flying"
    );


    setTimeout(
        () => {

            arrows.splice(
                index,
                1
            );

            drawBoard();


            if (
                arrows.length === 0
            ) {

                levelComplete.classList.remove(
                    "hidden"
                );

            }

        },
        450
    );

}


/* CHECK PATH */

function isPathClear(
    arrow
) {

    let x =
        arrow.x;

    let y =
        arrow.y;


    let dx = 0;

    let dy = 0;


    if (
        arrow.direction ===
        "left"
    ) {

        dx = -1;

    }


    if (
        arrow.direction ===
        "right"
    ) {

        dx = 1;

    }


    if (
        arrow.direction ===
        "up"
    ) {

        dy = -1;

    }


    if (
        arrow.direction ===
        "down"
    ) {

        dy = 1;

    }


    x += dx;

    y += dy;


    while (
        x >= 0 &&
        x < SIZE &&
        y >= 0 &&
        y < SIZE
    ) {


        const blocked =
            arrows.some(
                other =>
                    other.x === x &&
                    other.y === y
            );


        if (blocked) {

            return false;

        }


        x += dx;

        y += dy;

    }


    return true;

}


/* LOSE LIFE */

function loseLife() {

    lives--;


    updateUI();


    if (
        lives <= 0
    ) {

        gameOver.classList.remove(
            "hidden"
        );

    }

}


/* UPDATE UI */

function updateUI() {

    movesDisplay.textContent =
        moves;


    levelDisplay.textContent =
        level;


    const hearts = [

        document.getElementById(
            "heart1"
        ),

        document.getElementById(
            "heart2"
        ),

        document.getElementById(
            "heart3"
        )

    ];


    hearts.forEach(
        (
            heart,
            index
        ) => {

            if (
                index <
                lives
            ) {

                heart.textContent =
                    "❤️";

            } else {

                heart.textContent =
                    "🖤";

            }

        }
    );


    if (
        level <= 3
    ) {

        difficultyDisplay.textContent =
            "Easy";

    }

    else if (
        level <= 6
    ) {

        difficultyDisplay.textContent =
            "Normal";

    }

    else {

        difficultyDisplay.textContent =
            "Hard";

    }

}


/* RESTART */

restartButton.addEventListener(
    "click",
    startGame
);


/* TRY AGAIN */

tryAgainButton.addEventListener(
    "click",
    () => {

        gameOver.classList.add(
            "hidden"
        );

        startGame();

    }
);


/* NEXT LEVEL */

nextLevelButton.addEventListener(
    "click",
    () => {

        level++;

        levelComplete.classList.add(
            "hidden"
        );


        /* CURRENTLY REPEAT LEVEL 1 */

        const baseLevel =
            levels[
                (level - 1) %
                levels.length
            ];


        arrows =
            JSON.parse(
                JSON.stringify(
                    baseLevel
                )
            );


        moves = 0;

        lives = 3;


        updateUI();

        drawBoard();

    }
);


/* HINT */

hintButton.addEventListener(
    "click",
    () => {

        if (
            hints <= 0
        ) {

            message.textContent =
                "No hints left!";

            return;

        }


        const availableArrow =
            arrows.find(
                arrow =>
                    isPathClear(
                        arrow
                    )
            );


        if (
            !availableArrow
        ) {

            message.textContent =
                "No move available!";

            return;

        }


        hints--;


        const target =
            document.querySelector(
                `.cell[data-x="${availableArrow.x}"][data-y="${availableArrow.y}"] .arrow`
            );


        if (target) {

            target.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.3)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }

                ],
                {
                    duration:
                        700,
                    iterations:
                        2
                }
            );

        }

    }
);


/* START */

startGame();
