// ============================================
// BaziClassic V1
// ============================================

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");

const gameArea = document.getElementById("gameArea");
const gameTitle = document.getElementById("gameTitle");

const scoreText = document.getElementById("scoreText");
const livesText = document.getElementById("livesText");

const backButton = document.getElementById("backButton");
const restartButton = document.getElementById("restartButton");

let currentGame = "";
let currentScore = 0;
let animationID = null;


// ============================================
// GAME CARDS
// ============================================

document.querySelectorAll(".game-card").forEach(function(card) {

    card.addEventListener("click", function() {

        startGame(card.dataset.game);

    });

});


// ============================================
// START GAME
// ============================================

function startGame(game) {

    currentGame = game;
    currentScore = 0;

    cancelAnimationFrame(animationID);

    if (typeof animationID === "number") {
        cancelAnimationFrame(animationID);
    }

    gameArea.innerHTML = "";

    scoreText.textContent = "Score: 0";
    livesText.textContent = "";

    homeScreen.classList.remove("active");
    gameScreen.classList.add("active");


    if (game === "snake") {
        gameTitle.textContent = "Snake";
        startSnake();
    }

    else if (game === "snake2") {
        gameTitle.textContent = "Snake 2";
        startSnake2();
    }

    else if (game === "pong") {
        gameTitle.textContent = "Pong";
        startPong();
    }

    else if (game === "coincollector") {
        gameTitle.textContent = "Coin Collector";
        startCoin();
    }

    else if (game === "pong2") {
        gameTitle.textContent = "Pong 2";
        startPong2();
    }

    else if (game === "2048") {
        gameTitle.textContent = "2048";
        start2048();
    }

    else if (game === "xo") {
        gameTitle.textContent = "XO";
        startXO();
    }

    else if (game === "duel") {
        gameTitle.textContent = "Duel";
        startDuel();
    }

    else if (game === "discthief") {
        gameTitle.textContent = "Disc Thief";
        startDiscThief();
    }

    else if (game === "breakout") {
        gameTitle.textContent = "Breakout";
        startBreakout();
    }

    else if (game === "airhockey") {
        gameTitle.textContent = "Air Hockey";
        startAirHockey();
    }

    else if (game === "racing") {
        gameTitle.textContent = "Mini Racing";
        startRacing();
    }

    else if (game === "tetris") {
        gameTitle.textContent = "Tetris";
        startTetris();
    }

    else if (game === "memory") {
        gameTitle.textContent = "Memory";
        startMemory();
    }

    else if (game === "minesweeper") {
        gameTitle.textContent = "Minesweeper";
        startMinesweeper();
    }

    else if (game === "helicopter") {
        gameTitle.textContent = "Helicopter";
        startHelicopter();
    }

    else if (game === "dothunter") {
        gameTitle.textContent = "Dot Hunter";
        startDotHunter();
    }

    else if (game === "shooter") {
        gameTitle.textContent = "Space Shooter";
        startShooter();
    }

}


// ============================================
// SCORE
// ============================================

function updateScore() {

    scoreText.textContent =
        t("score") + ": " + currentScore;

}


// ============================================
// BACK
// ============================================

backButton.addEventListener("click", function() {

    cancelAnimationFrame(animationID);

    document.onkeydown = null;
    document.onmousemove = null;
    document.onmousedown = null;

    gameArea.innerHTML = "";

    gameScreen.classList.remove("active");
    homeScreen.classList.add("active");

    currentGame = "";

});


// ============================================
// RESTART
// ============================================

restartButton.addEventListener("click", function() {

    if (currentGame) {
        startGame(currentGame);
    }

});


// ============================================
// SNAKE
// ============================================

function startSnake() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 600;
    canvas.height = 450;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    const grid = 20;


    let snake = [
        { x: 300, y: 220 },
        { x: 280, y: 220 },
        { x: 260, y: 220 }
    ];


    let dx = 20;
    let dy = 0;


    let nextDX = dx;
    let nextDY = dy;


    let food = {};


    let running = true;


    function createFood() {

        do {

            food.x =
                Math.floor(
                    Math.random() * 29
                ) * grid + 20;

            food.y =
                Math.floor(
                    Math.random() * 21
                ) * grid + 20;

        } while (
            snake.some(
                part =>
                    part.x === food.x &&
                    part.y === food.y
            )
        );

    }


    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* =========================
           FOOD
        ========================= */

        ctx.fillStyle =
            "#ff4757";

        ctx.beginPath();

        ctx.arc(
            food.x,
            food.y,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* =========================
           BODY
        ========================= */

        for (
            let i = 1;
            i < snake.length;
            i++
        ) {

            ctx.fillStyle =
                "#4f9cff";

            ctx.fillRect(
                snake[i].x - 9,
                snake[i].y - 9,
                18,
                18
            );

        }


        /* =========================
           HEAD
        ========================= */

        const head =
            snake[0];


        ctx.fillStyle =
            "#1677ff";


        ctx.beginPath();


        if (dx > 0) {

            // Right

            ctx.moveTo(
                head.x + 12,
                head.y
            );

            ctx.lineTo(
                head.x - 8,
                head.y - 10
            );

            ctx.lineTo(
                head.x - 8,
                head.y + 10
            );

        }

        else if (dx < 0) {

            // Left

            ctx.moveTo(
                head.x - 12,
                head.y
            );

            ctx.lineTo(
                head.x + 8,
                head.y - 10
            );

            ctx.lineTo(
                head.x + 8,
                head.y + 10
            );

        }

        else if (dy < 0) {

            // Up

            ctx.moveTo(
                head.x,
                head.y - 12
            );

            ctx.lineTo(
                head.x - 10,
                head.y + 8
            );

            ctx.lineTo(
                head.x + 10,
                head.y + 8
            );

        }

        else {

            // Down

            ctx.moveTo(
                head.x,
                head.y + 12
            );

            ctx.lineTo(
                head.x - 10,
                head.y - 8
            );

            ctx.lineTo(
                head.x + 10,
                head.y - 8
            );

        }


        ctx.closePath();

        ctx.fill();

    }


    function gameOver() {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.7)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 42px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(
            "Game Over",
            canvas.width / 2,
            210
        );


        ctx.font =
            "22px Arial";


        ctx.fillText(
            "Score: " +
            currentScore,
            canvas.width / 2,
            250
        );

    }


    document.onkeydown =
        function(event) {

            if (
                event.key === "ArrowUp" &&
                dy !== 20
            ) {

                nextDX = 0;
                nextDY = -20;

            }

            else if (
                event.key === "ArrowDown" &&
                dy !== -20
            ) {

                nextDX = 0;
                nextDY = 20;

            }

            else if (
                event.key === "ArrowLeft" &&
                dx !== 20
            ) {

                nextDX = -20;
                nextDY = 0;

            }

            else if (
                event.key === "ArrowRight" &&
                dx !== -20
            ) {

                nextDX = 20;
                nextDY = 0;

            }

        };


    function update() {

        if (!running) return;


        dx = nextDX;
        dy = nextDY;


        const head = {

            x:
                snake[0].x + dx,

            y:
                snake[0].y + dy

        };


        /* WALL */

        if (

            head.x < 20 ||

            head.x >
            canvas.width - 20 ||

            head.y < 20 ||

            head.y >
            canvas.height - 20

        ) {

            gameOver();

            return;

        }


        /* BODY */

        for (
            let i = 0;
            i < snake.length;
            i++
        ) {

            if (

                head.x === snake[i].x &&

                head.y === snake[i].y

            ) {

                gameOver();

                return;

            }

        }


        snake.unshift(head);


        /* =========================
           EAT FOOD
        ========================= */

        if (

            head.x === food.x &&

            head.y === food.y

        ) {

            currentScore += 10;

            updateScore();

            createFood();

            // دم مار حذف نمی‌شود،
            // بنابراین مار رشد می‌کند.

        }

        else {

            snake.pop();

        }


        draw();

    }


    createFood();

    draw();


    animationID =
        setInterval(
            update,
            150
        );

}


// ============================================
// PONG
// ============================================

function startPong() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 450;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    let playerY = 175;
    let enemyY = 175;


    const paddleHeight = 100;
    const paddleWidth = 12;


    let ballX = 350;
    let ballY = 225;

    let ballDX = 4;
    let ballDY = 3;


    let playerScore = 0;
    let enemyScore = 0;


    let gameRunning = true;


    document.onmousemove =
        function(event) {

            const rect =
                canvas.getBoundingClientRect();


            playerY =
                event.clientY -
                rect.top -
                paddleHeight / 2;


            playerY =
                Math.max(
                    0,
                    Math.min(
                        canvas.height -
                        paddleHeight,
                        playerY
                    )
                );

        };


    function resetBall(direction) {

        ballX =
            canvas.width / 2;

        ballY =
            canvas.height / 2;


        ballDX =
            direction * 4;


        ballDY =
            (
                Math.random() > 0.5
                    ? 1
                    : -1
            ) * 3;

    }


    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // Center line

        ctx.strokeStyle =
            "#475569";

        ctx.setLineDash([
            10,
            10
        ]);

        ctx.beginPath();

        ctx.moveTo(350, 0);

        ctx.lineTo(350, 450);

        ctx.stroke();

        ctx.setLineDash([]);


        // Player

        ctx.fillStyle =
            "#1677ff";

        ctx.fillRect(
            15,
            playerY,
            paddleWidth,
            paddleHeight
        );


        // AI

        ctx.fillStyle =
            "#ff4757";

        ctx.fillRect(
            673,
            enemyY,
            paddleWidth,
            paddleHeight
        );


        // Ball

        ctx.fillStyle =
            "white";

        ctx.beginPath();

        ctx.arc(
            ballX,
            ballY,
            9,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // Score

        ctx.font =
            "bold 28px Arial";

        ctx.textAlign =
            "center";

        ctx.fillStyle =
            "white";

        ctx.fillText(
            playerScore,
            300,
            45
        );

        ctx.fillText(
            enemyScore,
            400,
            45
        );

    }


    function update() {

        if (!gameRunning) return;


        // =====================================
        // AI
        // =====================================

        /*
         * AI عمداً کمی خطا دارد.
         *
         * وقتی توپ به سمت AI می‌آید:
         * سرعت بیشتر
         *
         * وقتی توپ از AI دور می‌شود:
         * سرعت کمتر
         */

        let aiSpeed;


        if (ballDX > 0) {

            aiSpeed = 2.35;

        }

        else {

            aiSpeed = 1.45;

        }


        /*
         * حرکت کوچک تصادفی/موجی
         * باعث می‌شود AI کامل نباشد.
         */

        const targetOffset =
            Math.sin(
                Date.now() / 650
            ) * 12;


        const desiredY =
            ballY +
            targetOffset -
            paddleHeight / 2;


        if (
            enemyY <
            desiredY - 7
        ) {

            enemyY += aiSpeed;

        }

        else if (
            enemyY >
            desiredY + 7
        ) {

            enemyY -= aiSpeed;

        }


        enemyY =
            Math.max(
                0,
                Math.min(
                    canvas.height -
                    paddleHeight,
                    enemyY
                )
            );


        // =====================================
        // BALL
        // =====================================

        ballX += ballDX;
        ballY += ballDY;


        // Top / bottom

        if (
            ballY <= 9 ||
            ballY >= canvas.height - 9
        ) {

            ballDY *= -1;

        }


        // =====================================
        // PLAYER COLLISION
        // =====================================

        if (

            ballX - 9 <= 27 &&

            ballX > 15 &&

            ballY >= playerY &&

            ballY <=
            playerY +
            paddleHeight &&

            ballDX < 0

        ) {

            ballDX =
                Math.abs(ballDX) + 0.15;


            const hitPosition =
                (
                    ballY -
                    (
                        playerY +
                        paddleHeight / 2
                    )
                ) /
                (
                    paddleHeight / 2
                );


            ballDY =
                hitPosition * 4;

        }


        // =====================================
        // AI COLLISION
        // =====================================

        if (

            ballX + 9 >= 673 &&

            ballX < 685 &&

            ballY >= enemyY &&

            ballY <=
            enemyY +
            paddleHeight &&

            ballDX > 0

        ) {

            ballDX =
                -Math.abs(ballDX) - 0.1;


            const hitPosition =
                (
                    ballY -
                    (
                        enemyY +
                        paddleHeight / 2
                    )
                ) /
                (
                    paddleHeight / 2
                );


            ballDY =
                hitPosition * 4;

        }


        // =====================================
        // PLAYER LOSES
        // =====================================

        if (
            ballX < 0
        ) {

            enemyScore++;

            resetBall(1);

        }


        // =====================================
        // PLAYER SCORES
        // =====================================

        if (
            ballX >
            canvas.width
        ) {

            playerScore++;

            currentScore += 10;

            updateScore();

            resetBall(-1);

        }


        draw();

    }


    function loop() {

        update();

        animationID =
            requestAnimationFrame(
                loop
            );

    }


    draw();

    loop();

}


// ============================================
// XO
// ============================================

function startXO() {

    const board =
        document.createElement("div");

    board.className =
        "xo-board";

    gameArea.appendChild(board);


    let cells =
        Array(9).fill("");


    let playerTurn = true;
    let gameOver = false;


    const combinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    function checkWinner() {

        for (
            const combo of combinations
        ) {

            const a = combo[0];
            const b = combo[1];
            const c = combo[2];


            if (
                cells[a] &&
                cells[a] === cells[b] &&
                cells[a] === cells[c]
            ) {

                return cells[a];

            }

        }


        if (
            cells.every(
                cell => cell !== ""
            )
        ) {

            return "draw";

        }


        return null;

    }


    function findWinningMove(symbol) {

        for (
            const combo of combinations
        ) {

            const a = combo[0];
            const b = combo[1];
            const c = combo[2];


            if (
                cells[a] === symbol &&
                cells[b] === symbol &&
                cells[c] === ""
            ) {

                return c;

            }


            if (
                cells[a] === symbol &&
                cells[c] === symbol &&
                cells[b] === ""
            ) {

                return b;

            }


            if (
                cells[b] === symbol &&
                cells[c] === symbol &&
                cells[a] === ""
            ) {

                return a;

            }

        }


        return -1;

    }


    function finish(result) {

        gameOver = true;


        if (result === "X") {

            currentScore += 10;

            updateScore();

            setTimeout(
                function() {
                    alert("You win!");
                },
                50
            );

        }

        else if (result === "O") {

            setTimeout(
                function() {
                    alert("Computer wins!");
                },
                50
            );

        }

        else {

            setTimeout(
                function() {
                    alert("Draw!");
                },
                50
            );

        }

    }


    function computerMove() {

        if (gameOver) return;


        let move =
            findWinningMove("O");


        if (move === -1) {

            move =
                findWinningMove("X");

        }


        if (
            move === -1 &&
            cells[4] === ""
        ) {

            move = 4;

        }


        if (move === -1) {

            const corners =
                [0, 2, 6, 8].filter(
                    index =>
                        cells[index] === ""
                );


            if (corners.length > 0) {

                move =
                    corners[
                        Math.floor(
                            Math.random() *
                            corners.length
                        )
                    ];

            }

        }


        if (move === -1) {

            const empty =
                cells
                    .map(
                        (value, index) =>
                            value === ""
                                ? index
                                : null
                    )
                    .filter(
                        value =>
                            value !== null
                    );


            if (empty.length > 0) {

                move =
                    empty[
                        Math.floor(
                            Math.random() *
                            empty.length
                        )
                    ];

            }

        }


        if (move !== -1) {

            cells[move] = "O";

        }


        render();


        const result =
            checkWinner();


        if (result) {

            finish(result);

            return;

        }


        playerTurn = true;

    }


    function render() {

        board.innerHTML = "";


        cells.forEach(
            function(value, index) {

                const cell =
                    document.createElement("button");


                cell.className =
                    "xo-cell";


                cell.textContent =
                    value;


                cell.addEventListener(
                    "click",
                    function() {

                        if (
                            gameOver ||
                            !playerTurn ||
                            cells[index] !== ""
                        ) {

                            return;

                        }


                        cells[index] = "X";

                        playerTurn = false;

                        render();


                        const result =
                            checkWinner();


                        if (result) {

                            finish(result);

                            return;

                        }


                        setTimeout(
                            computerMove,
                            350
                        );

                    }
                );


                board.appendChild(cell);

            }
        );

    }


    render();

}


// ============================================
// BREAKOUT
// ============================================

function startBreakout() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 500;

    canvas.className =
        "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    let paddleX = 300;

    const paddleWidth = 100;
    const paddleHeight = 12;


    let ballX = 350;
    let ballY = 430;

    let ballDX = 4;
    let ballDY = -4;


    let running = true;


    const rows = 5;
    const columns = 8;

    const bricks = [];


    for (
        let row = 0;
        row < rows;
        row++
    ) {

        for (
            let col = 0;
            col < columns;
            col++
        ) {

            bricks.push({

                x: 35 + col * 80,
                y: 45 + row * 30,

                width: 65,
                height: 20,

                alive: true

            });

        }

    }


    document.onmousemove =
        function(event) {

            const rect =
                canvas.getBoundingClientRect();


            paddleX =
                event.clientX -
                rect.left -
                paddleWidth / 2;


            paddleX =
                Math.max(
                    0,
                    Math.min(
                        canvas.width -
                        paddleWidth,
                        paddleX
                    )
                );

        };


    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        bricks.forEach(
            function(brick) {

                if (!brick.alive) return;


                ctx.fillStyle =
                    "#1677ff";


                ctx.fillRect(
                    brick.x,
                    brick.y,
                    brick.width,
                    brick.height
                );

            }
        );


        ctx.fillStyle =
            "white";

        ctx.fillRect(
            paddleX,
            canvas.height - 35,
            paddleWidth,
            paddleHeight
        );


        ctx.beginPath();

        ctx.arc(
            ballX,
            ballY,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    function endGame(message) {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.65)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 40px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(
            message,
            canvas.width / 2,
            240
        );

    }


    function update() {

        if (!running) return;


        ballX += ballDX;
        ballY += ballDY;


        if (
            ballX <= 8 ||
            ballX >= canvas.width - 8
        ) {

            ballDX *= -1;

        }


        if (ballY <= 8) {

            ballDY *= -1;

        }


        if (

            ballY + 8 >=
            canvas.height - 35 &&

            ballX >= paddleX &&

            ballX <=
            paddleX + paddleWidth &&

            ballDY > 0

        ) {

            ballDY =
                -Math.abs(ballDY);


            const hit =
                (
                    ballX -
                    (
                        paddleX +
                        paddleWidth / 2
                    )
                ) /
                (
                    paddleWidth / 2
                );


            ballDX =
                hit * 5;

        }


        for (
            const brick of bricks
        ) {

            if (!brick.alive) continue;


            if (

                ballX + 8 >
                brick.x &&

                ballX - 8 <
                brick.x +
                brick.width &&

                ballY + 8 >
                brick.y &&

                ballY - 8 <
                brick.y +
                brick.height

            ) {

                brick.alive = false;

                ballDY *= -1;

                currentScore += 10;

                updateScore();

                break;

            }

        }


        if (
            bricks.every(
                brick =>
                    !brick.alive
            )
        ) {

            endGame("You Win!");

            return;

        }


        if (
            ballY >
            canvas.height
        ) {

            endGame("Game Over");

            return;

        }


        draw();


        animationID =
            requestAnimationFrame(
                update
            );

    }


    draw();

    update();

}


// ============================================
// MEMORY
// ============================================

function startMemory() {

    const board =
        document.createElement("div");

    board.className =
        "memory-board";

    gameArea.appendChild(board);


    const symbols = [

        "🍎", "🍎",
        "🚀", "🚀",
        "⚽", "⚽",
        "🎮", "🎮",
        "🐱", "🐱",
        "⭐", "⭐",
        "🔥", "🔥",
        "💎", "💎"

    ];


    symbols.sort(
        () =>
            Math.random() - 0.5
    );


    let firstCard = null;
    let secondCard = null;

    let locked = false;

    let matched = 0;


    symbols.forEach(
        function(symbol) {

            const card =
                document.createElement("button");


            card.className =
                "memory-card";


            card.textContent = "?";

            card.dataset.symbol =
                symbol;


            card.addEventListener(
                "click",
                function() {

                    if (
                        locked ||
                        card.classList.contains("matched") ||
                        card === firstCard
                    ) {

                        return;

                    }


                    card.classList.add("flipped");

                    card.textContent =
                        symbol;


                    if (!firstCard) {

                        firstCard = card;

                        return;

                    }


                    secondCard = card;

                    locked = true;


                    if (
                        firstCard.dataset.symbol ===
                        secondCard.dataset.symbol
                    ) {

                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");


                        matched++;

                        currentScore += 10;

                        updateScore();


                        firstCard = null;
                        secondCard = null;

                        locked = false;


                        if (matched === 8) {

                            setTimeout(
                                function() {

                                    alert(
                                        "You found all pairs!"
                                    );

                                },
                                300
                            );

                        }

                    }

                    else {

                        setTimeout(
                            function() {

                                firstCard.classList.remove("flipped");
                                secondCard.classList.remove("flipped");


                                firstCard.textContent = "?";
                                secondCard.textContent = "?";


                                firstCard = null;
                                secondCard = null;

                                locked = false;

                            },
                            800
                        );

                    }

                }
            );


            board.appendChild(card);

        }
    );

}


// ============================================
// SPACE SHOOTER
// ============================================

function startShooter() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 500;

    canvas.className =
        "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    let playerX = 350;


    let bullets = [];
    let enemies = [];


    /* =========================
       LIVES
    ========================= */

    let lives = 5;

    const dangerLineY = 410;


    let running = true;


    let lastShot = 0;

    let lastEnemySpawn = 0;


    livesText.textContent =
       t("lives") + ": 5";


    /* =========================
       PLAYER MOVEMENT
    ========================= */

    document.onmousemove =
        function(event) {

            const rect =
                canvas.getBoundingClientRect();


            playerX =
                event.clientX -
                rect.left;


            playerX =
                Math.max(
                    25,
                    Math.min(
                        canvas.width - 25,
                        playerX
                    )
                );

        };


    /* =========================
       SHOOT
    ========================= */

    function shoot() {

        const now =
            Date.now();


        if (
            now - lastShot < 250
        ) {

            return;

        }


        lastShot = now;


        bullets.push({

            x: playerX,

            y: 440,

            speed: 9

        });

    }


    /* Mouse */

    document.onmousedown =
        function(event) {

            if (
                event.button === 0
            ) {

                shoot();

            }

        };


    /* Space */

    document.onkeydown =
        function(event) {

            if (
                event.code === "Space"
            ) {

                event.preventDefault();

                shoot();

            }

        };


    /* =========================
       SPAWN ENEMY
    ========================= */

    function spawnEnemy() {

        enemies.push({

            x:
                30 +
                Math.random() *
                (
                    canvas.width - 60
                ),

            y: -30,

            speed:
                1.2 +
                Math.random() * 0.8

        });

    }


    /* =========================
       DRAW
    ========================= */

    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* =========================
           DANGER LINE
        ========================= */

        ctx.strokeStyle =
            "#ff4757";

        ctx.lineWidth = 3;

        ctx.setLineDash([
            12,
            8
        ]);

        ctx.beginPath();

        ctx.moveTo(
            0,
            dangerLineY
        );

        ctx.lineTo(
            canvas.width,
            dangerLineY
        );

        ctx.stroke();

        ctx.setLineDash([]);


        /* =========================
           PLAYER
        ========================= */

        ctx.fillStyle =
            "#1677ff";

        ctx.beginPath();

        ctx.moveTo(
            playerX,
            420
        );

        ctx.lineTo(
            playerX - 22,
            460
        );

        ctx.lineTo(
            playerX + 22,
            460
        );

        ctx.closePath();

        ctx.fill();


        /* =========================
           BULLETS
        ========================= */

        ctx.fillStyle =
            "white";


        bullets.forEach(
            function(bullet) {

                ctx.fillRect(

                    bullet.x - 2,

                    bullet.y,

                    4,

                    12

                );

            }
        );


        /* =========================
           ENEMIES
        ========================= */

        enemies.forEach(
            function(enemy) {

                ctx.fillStyle =
                    "#ff4757";


                ctx.beginPath();

                ctx.arc(

                    enemy.x,

                    enemy.y,

                    18,

                    0,

                    Math.PI * 2

                );

                ctx.fill();

            }
        );

    }


    /* =========================
       GAME OVER
    ========================= */

    function gameOver() {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.7)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 42px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(
            "Game Over",
            canvas.width / 2,
            230
        );


        ctx.font =
            "22px Arial";


        ctx.fillText(
            "Score: " +
            currentScore,
            canvas.width / 2,
            270
        );

    }


    /* =========================
       UPDATE
    ========================= */

    function update() {

        if (!running) return;


        const now =
            Date.now();


        /* =========================
           ENEMY SPAWN
        ========================= */

        const spawnDelay =
            Math.max(
                400,
                1100 -
                currentScore * 8
            );


        if (
            now - lastEnemySpawn >
            spawnDelay
        ) {

            spawnEnemy();

            lastEnemySpawn =
                now;

        }


        /* =========================
           BULLETS
        ========================= */

        bullets.forEach(
            function(bullet) {

                bullet.y -=
                    bullet.speed;

            }
        );


        bullets =
            bullets.filter(
                function(bullet) {

                    return (
                        bullet.y > -20
                    );

                }
            );


        /* =========================
           ENEMIES
        ========================= */

        enemies.forEach(
            function(enemy) {

                enemy.y +=
                    enemy.speed;

            }
        );


        /* =========================
           BULLET COLLISION
        ========================= */

        for (
            let i = enemies.length - 1;
            i >= 0;
            i--
        ) {

            let destroyed = false;


            for (
                let j = bullets.length - 1;
                j >= 0;
                j--
            ) {

                const enemy =
                    enemies[i];

                const bullet =
                    bullets[j];


                const distance =
                    Math.hypot(

                        enemy.x -
                        bullet.x,

                        enemy.y -
                        bullet.y

                    );


                if (
                    distance < 22
                ) {

                    enemies.splice(
                        i,
                        1
                    );

                    bullets.splice(
                        j,
                        1
                    );


                    currentScore += 10;

                    updateScore();


                    destroyed = true;

                    break;

                }

            }


            if (destroyed) {

                continue;

            }

        }


        /* =========================
           DANGER LINE
        ========================= */

        for (
            let i = enemies.length - 1;
            i >= 0;
            i--
        ) {

            /*
             * وقتی پایین دشمن به خط برسد
             * یک جان کم می‌شود.
             */

            if (
                enemies[i].y + 18 >=
                dangerLineY
            ) {

                enemies.splice(
                    i,
                    1
                );


                lives--;


                livesText.textContent =
                    t("lives") + ": " + lives

                if (
                    lives <= 0
                ) {

                    gameOver();

                    return;

                }

            }

        }


        draw();


        animationID =
            requestAnimationFrame(
                update
            );

    }


    draw();

    update();

}
// ============================================
// AIR HOCKEY
// ============================================

function startAirHockey() {

    const canvas = document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 500;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx = canvas.getContext("2d");


    let playerX = 350;
    let playerY = 430;

    let aiX = 350;
    let aiY = 70;


    const paddleRadius = 28;
    const puckRadius = 13;


    let puckX = 350;
    let puckY = 250;

    let puckDX = 4;
    let puckDY = 4;


    let playerScore = 0;
    let aiScore = 0;

    let running = true;


    document.onmousemove = function(event) {

        const rect =
            canvas.getBoundingClientRect();


        playerX =
            event.clientX -
            rect.left;

        playerY =
            event.clientY -
            rect.top;


        playerX =
            Math.max(
                paddleRadius,
                Math.min(
                    canvas.width - paddleRadius,
                    playerX
                )
            );


        playerY =
            Math.max(
                canvas.height / 2 +
                paddleRadius,

                Math.min(
                    canvas.height -
                    paddleRadius,

                    playerY
                )
            );

    };


    function resetPuck(direction) {

        puckX =
            canvas.width / 2;

        puckY =
            canvas.height / 2;


        puckDX =
            (Math.random() > 0.5 ? 1 : -1) *
            4;


        puckDY =
            direction *
            4;

    }


    function draw() {

        /* Background */

        ctx.fillStyle =
            "#eaf3ff";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* Border */

        ctx.strokeStyle =
            "#1677ff";

        ctx.lineWidth = 5;

        ctx.strokeRect(
            5,
            5,
            canvas.width - 10,
            canvas.height - 10
        );


        /* Center line */

        ctx.strokeStyle =
            "#8bbcff";

        ctx.lineWidth = 2;

        ctx.setLineDash([
            10,
            10
        ]);

        ctx.beginPath();

        ctx.moveTo(
            5,
            canvas.height / 2
        );

        ctx.lineTo(
            canvas.width - 5,
            canvas.height / 2
        );

        ctx.stroke();

        ctx.setLineDash([]);


        /* Center circle */

        ctx.beginPath();

        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            55,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        /* Goals */

        ctx.fillStyle =
            "#172033";

        ctx.fillRect(
            275,
            0,
            150,
            12
        );

        ctx.fillRect(
            275,
            canvas.height - 12,
            150,
            12
        );


        /* AI paddle */

        ctx.fillStyle =
            "#ff4757";

        ctx.beginPath();

        ctx.arc(
            aiX,
            aiY,
            paddleRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* Player paddle */

        ctx.fillStyle =
            "#1677ff";

        ctx.beginPath();

        ctx.arc(
            playerX,
            playerY,
            paddleRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* Puck */

        ctx.fillStyle =
            "#172033";

        ctx.beginPath();

        ctx.arc(
            puckX,
            puckY,
            puckRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* Score */

        ctx.fillStyle =
            "#172033";

        ctx.font =
            "bold 28px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            aiScore,
            canvas.width / 2,
            45
        );

        ctx.fillText(
            playerScore,
            canvas.width / 2,
            canvas.height - 25
        );

    }


    function endGame(message) {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.65)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 42px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            message,
            canvas.width / 2,
            235
        );

    }


    function update() {

        if (!running) return;


        /* =========================
           AI MOVEMENT
        ========================= */

        if (
            aiX <
            puckX - 8
        ) {

            aiX += 2.5;

        }

        else if (
            aiX >
            puckX + 8
        ) {

            aiX -= 2.5;

        }


        aiX =
            Math.max(
                paddleRadius,
                Math.min(
                    canvas.width -
                    paddleRadius,
                    aiX
                )
            );


        /* =========================
           PUCK
        ========================= */

        puckX += puckDX;
        puckY += puckDY;


        /* Side walls */

        if (
            puckX - puckRadius <= 5 ||
            puckX + puckRadius >=
            canvas.width - 5
        ) {

            puckDX *= -1;

        }


        /* =========================
           PADDLE COLLISION
        ========================= */

        function hitPaddle(
            paddleX,
            paddleY
        ) {

            const distance =
                Math.hypot(
                    puckX - paddleX,
                    puckY - paddleY
                );


            if (
                distance <=
                paddleRadius +
                puckRadius
            ) {

                const angle =
                    Math.atan2(
                        puckY - paddleY,
                        puckX - paddleX
                    );


                const speed =
                    Math.max(
                        4.5,
                        Math.hypot(
                            puckDX,
                            puckDY
                        )
                    );


                puckDX =
                    Math.cos(angle) *
                    speed;

                puckDY =
                    Math.sin(angle) *
                    speed;


                puckX =
                    paddleX +
                    Math.cos(angle) *
                    (
                        paddleRadius +
                        puckRadius +
                        2
                    );


                puckY =
                    paddleY +
                    Math.sin(angle) *
                    (
                        paddleRadius +
                        puckRadius +
                        2
                    );

            }

        }


        hitPaddle(
            playerX,
            playerY
        );


        hitPaddle(
            aiX,
            aiY
        );


        /* =========================
           GOALS
        ========================= */

        if (
            puckY <
            -puckRadius
        ) {

            playerScore++;

            currentScore += 10;

            updateScore();

            resetPuck(1);

        }


        if (
            puckY >
            canvas.height +
            puckRadius
        ) {

            aiScore++;

            resetPuck(-1);

        }


        /* =========================
           WIN
        ========================= */

        if (
            playerScore >= 5
        ) {

            endGame("You Win!");

            return;

        }


        if (
            aiScore >= 5
        ) {

            endGame("Computer Wins!");

            return;

        }


        draw();


        animationID =
            requestAnimationFrame(
                update
            );

    }


    resetPuck(
        Math.random() > 0.5
            ? 1
            : -1
    );


    draw();

    update();

}
// ============================================
// MINI RACING
// ============================================

function startRacing() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 500;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    let playerX = 350;
    let playerY = 410;


    let roadOffset = 0;

    let speed = 5;

    let distance = 0;

    let running = true;


    let obstacles = [];

    let lastObstacle = 0;


    let keys = {};


    /* =========================
       KEYBOARD
    ========================= */

    document.onkeydown = function(event) {

        keys[event.key.toLowerCase()] = true;

        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown"
        ) {

            event.preventDefault();

        }

    };


    document.onkeyup = function(event) {

        keys[event.key.toLowerCase()] = false;

    };


    /* =========================
       ROAD
    ========================= */

    const roadLeft = 150;
    const roadRight = 550;

    const roadWidth =
        roadRight - roadLeft;


    /* =========================
       PLAYER CAR
    ========================= */

    const carWidth = 48;
    const carHeight = 82;


    /* =========================
       OBSTACLES
    ========================= */

    function spawnObstacle() {

        const lanes = [
            210,
            300,
            390,
            480
        ];


        const lane =
            lanes[
                Math.floor(
                    Math.random() *
                    lanes.length
                )
            ];


        obstacles.push({

            x: lane,

            y: -100,

            width: 48,

            height: 82,

            speed:
                speed * (
                    0.8 +
                    Math.random() * 0.35
                )

        });

    }


    /* =========================
       DRAW CAR
    ========================= */

    function drawCar(
        x,
        y,
        player
    ) {

        ctx.save();

        ctx.translate(x, y);


        /* Shadow */

        ctx.fillStyle =
            "rgba(0,0,0,0.3)";

        ctx.fillRect(
            -25,
            -35,
            50,
            78
        );


        /* Wheels */

        ctx.fillStyle =
            "#111827";


        ctx.fillRect(
            -27,
            -27,
            9,
            24
        );

        ctx.fillRect(
            18,
            -27,
            9,
            24
        );

        ctx.fillRect(
            -27,
            15,
            9,
            24
        );

        ctx.fillRect(
            18,
            15,
            9,
            24
        );


        /* Main body */

        const bodyColor =
            player
                ? "#1677ff"
                : "#ff4757";


        ctx.fillStyle =
            bodyColor;


        ctx.beginPath();

        ctx.roundRect(
            -21,
            -41,
            42,
            82,
            10,
            );

        ctx.fill();


        /* Front hood */

        ctx.fillStyle =
            player
                ? "#075dcc"
                : "#d93646";


        ctx.beginPath();

        ctx.roundRect(
            -17,
            -37,
            34,
            18,
            5
        );

        ctx.fill();


        /* Windshield */

        ctx.fillStyle =
            "#bde3ff";


        ctx.beginPath();

        ctx.moveTo(
            -15,
            -16
        );

        ctx.lineTo(
            15,
            -16
        );

        ctx.lineTo(
            12,
            4
        );

        ctx.lineTo(
            -12,
            4
        );

        ctx.closePath();

        ctx.fill();


        /* Window separator */

        ctx.strokeStyle =
            "rgba(23,32,51,0.45)";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
            0,
            -15
        );

        ctx.lineTo(
            0,
            4
        );

        ctx.stroke();


        /* Rear window */

        ctx.fillStyle =
            "#8fc8ee";


        ctx.beginPath();

        ctx.moveTo(
            -12,
            8
        );

        ctx.lineTo(
            12,
            8
        );

        ctx.lineTo(
            15,
            22
        );

        ctx.lineTo(
            -15,
            22
        );

        ctx.closePath();

        ctx.fill();


        /* Headlights */

        ctx.fillStyle =
            "#fff7b2";


        ctx.fillRect(
            -15,
            -38,
            9,
            5
        );

        ctx.fillRect(
            6,
            -38,
            9,
            5
        );


        /* Front bumper */

        ctx.fillStyle =
            "#172033";


        ctx.fillRect(
            -15,
            -43,
            30,
            4
        );


        /* Rear lights */

        ctx.fillStyle =
            "#ff304f";


        ctx.fillRect(
            -15,
            34,
            9,
            5
        );

        ctx.fillRect(
            6,
            34,
            9,
            5
        );


        /* Center stripe */

        if (player) {

            ctx.fillStyle =
                "rgba(255,255,255,0.85)";


            ctx.fillRect(
                -3,
                7,
                6,
                28
            );

        }


        ctx.restore();

    }


    /* =========================
       DRAW ROAD
    ========================= */

    function drawRoad() {

        /* Grass */

        ctx.fillStyle =
            "#7fba72";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* Road */

        ctx.fillStyle =
            "#303846";

        ctx.fillRect(
            roadLeft,
            0,
            roadWidth,
            canvas.height
        );


        /* Road edges */

        ctx.fillStyle =
            "#f4f4f4";


        ctx.fillRect(
            roadLeft,
            0,
            7,
            canvas.height
        );


        ctx.fillRect(
            roadRight - 7,
            0,
            7,
            canvas.height
        );


        /* Lane lines */

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 5;

        ctx.setLineDash([
            28,
            24
        ]);

        ctx.lineDashOffset =
            roadOffset;


        ctx.beginPath();

        ctx.moveTo(
            250,
            0
        );

        ctx.lineTo(
            250,
            canvas.height
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            350,
            0
        );

        ctx.lineTo(
            350,
            canvas.height
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            450,
            0
        );

        ctx.lineTo(
            450,
            canvas.height
        );

        ctx.stroke();


        ctx.setLineDash([]);

    }


    /* =========================
       COLLISION
    ========================= */

    function collision(a, b) {

        return (

            a.x - a.width / 2 <
            b.x + b.width / 2 &&

            a.x + a.width / 2 >
            b.x - b.width / 2 &&

            a.y - a.height / 2 <
            b.y + b.height / 2 &&

            a.y + a.height / 2 >
            b.y - b.height / 2

        );

    }


    /* =========================
       GAME OVER
    ========================= */

    function gameOver() {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.7)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.textAlign =
            "center";


        ctx.font =
            "bold 42px Arial";


        ctx.fillText(
            "Crash!",
            canvas.width / 2,
            225
        );


        ctx.font =
            "22px Arial";


        ctx.fillText(
            "Score: " +
            currentScore,
            canvas.width / 2,
            265
        );

    }


    /* =========================
       UPDATE
    ========================= */

    function update() {

        if (!running) return;


        /* Player movement */

        if (
            keys["arrowleft"] ||
            keys["a"]
        ) {

            playerX -= 6;

        }


        if (
            keys["arrowright"] ||
            keys["d"]
        ) {

            playerX += 6;

        }


        if (
            keys["arrowup"] ||
            keys["w"]
        ) {

            playerY -= 4;

        }


        if (
            keys["arrowdown"] ||
            keys["s"]
        ) {

            playerY += 4;

        }


        /* Keep car on road */

        playerX =
            Math.max(
                roadLeft + 35,
                Math.min(
                    roadRight - 35,
                    playerX
                )
            );


        playerY =
            Math.max(
                80,
                Math.min(
                    canvas.height - 55,
                    playerY
                )
            );


        /* Road movement */

        roadOffset += speed;


        if (
            roadOffset > 52
        ) {

            roadOffset = 0;

        }


        /* Distance */

        distance += speed;


        currentScore =
            Math.floor(
                distance / 10
            );

        updateScore();


        /* Spawn */

        const now =
            Date.now();


        if (
            now - lastObstacle >
            850
        ) {

            spawnObstacle();

            lastObstacle =
                now;

        }


        /* Obstacles */

        obstacles.forEach(
            function(obstacle) {

                obstacle.y +=
                    obstacle.speed;

            }
        );


        /* Collision */

        const playerCar = {

            x: playerX,

            y: playerY,

            width: carWidth - 8,

            height: carHeight - 10

        };


        for (
            const obstacle of obstacles
        ) {

            if (
                collision(
                    playerCar,
                    obstacle
                )
            ) {

                gameOver();

                return;

            }

        }


        /* Remove old cars */

        obstacles =
            obstacles.filter(
                function(obstacle) {

                    return (
                        obstacle.y <
                        canvas.height + 100
                    );

                }
            );


        /* Draw */

        drawRoad();


        obstacles.forEach(
            function(obstacle) {

                drawCar(
                    obstacle.x,
                    obstacle.y,
                    false
                );

            }
        );


        drawCar(
            playerX,
            playerY,
            true
        );


        animationID =
            requestAnimationFrame(
                update
            );

    }


    /* Start */

    drawRoad();

    drawCar(
        playerX,
        playerY,
        true
    );


    update();

}
// ============================================
// TETRIS
// ============================================

function startTetris() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 300;
    canvas.height = 600;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    const columns = 10;
    const rows = 20;
    const block = 30;


    let board =
        Array.from(
            { length: rows },
            () => Array(columns).fill(0)
        );


    const pieces = [

        // I
        [
            [1, 1, 1, 1]
        ],

        // O
        [
            [1, 1],
            [1, 1]
        ],

        // T
        [
            [0, 1, 0],
            [1, 1, 1]
        ],

        // L
        [
            [1, 0, 0],
            [1, 1, 1]
        ],

        // J
        [
            [0, 0, 1],
            [1, 1, 1]
        ],

        // S
        [
            [0, 1, 1],
            [1, 1, 0]
        ],

        // Z
        [
            [1, 1, 0],
            [0, 1, 1]
        ]

    ];


    const pieceColors = [

        "#1677ff",
        "#22a06b",
        "#a855f7",
        "#f59e0b",
        "#ef4444",
        "#06b6d4",
        "#ec4899"

    ];


    let currentPiece;

    let currentColor;

    let pieceX;

    let pieceY;


    let dropTimer = 0;

    let lastTime = 0;

    let dropInterval = 700;


    let running = true;


    /* =========================
       NEW PIECE
    ========================= */

    function newPiece() {

        const index =
            Math.floor(
                Math.random() *
                pieces.length
            );


        currentPiece =
            pieces[index].map(
                row => [...row]
            );


        currentColor =
            pieceColors[index];


        pieceX =
            Math.floor(
                columns / 2
            ) -
            Math.ceil(
                currentPiece[0].length / 2
            );


        pieceY = 0;


        if (
            collision(
                currentPiece,
                pieceX,
                pieceY
            )
        ) {

            gameOver();

        }

    }


    /* =========================
       COLLISION
    ========================= */

    function collision(
        piece,
        offsetX,
        offsetY
    ) {

        for (
            let y = 0;
            y < piece.length;
            y++
        ) {

            for (
                let x = 0;
                x < piece[y].length;
                x++
            ) {

                if (
                    !piece[y][x]
                ) {

                    continue;

                }


                const boardX =
                    offsetX + x;

                const boardY =
                    offsetY + y;


                if (
                    boardX < 0 ||
                    boardX >= columns ||
                    boardY >= rows
                ) {

                    return true;

                }


                if (
                    boardY >= 0 &&
                    board[boardY][boardX]
                ) {

                    return true;

                }

            }

        }


        return false;

    }


    /* =========================
       MERGE
    ========================= */

    function merge() {

        for (
            let y = 0;
            y < currentPiece.length;
            y++
        ) {

            for (
                let x = 0;
                x < currentPiece[y].length;
                x++
            ) {

                if (
                    currentPiece[y][x]
                ) {

                    board[
                        pieceY + y
                    ][
                        pieceX + x
                    ] = currentColor;

                }

            }

        }

    }


    /* =========================
       CLEAR LINES
    ========================= */

    function clearLines() {

        let lines = 0;


        for (
            let y = rows - 1;
            y >= 0;
            y--
        ) {

            if (
                board[y].every(
                    cell => cell !== 0
                )
            ) {

                board.splice(
                    y,
                    1
                );


                board.unshift(
                    Array(columns).fill(0)
                );


                lines++;

                y++;

            }

        }


        if (lines > 0) {

            currentScore +=
                lines * 100;


            updateScore();


            /*
             * با بالا رفتن امتیاز،
             * سرعت افتادن قطعه‌ها بیشتر می‌شود.
             */

            dropInterval =
                Math.max(
                    120,
                    700 -
                    Math.floor(
                        currentScore / 500
                    ) * 60
                );

        }

    }


    /* =========================
       ROTATE
    ========================= */

    function rotatePiece() {

        const oldPiece =
            currentPiece;


        const height =
            oldPiece.length;

        const width =
            oldPiece[0].length;


        const rotated =
            [];


        for (
            let x = 0;
            x < width;
            x++
        ) {

            rotated[x] = [];


            for (
                let y = height - 1;
                y >= 0;
                y--
            ) {

                rotated[x].push(
                    oldPiece[y][x]
                );

            }

        }


        if (
            !collision(
                rotated,
                pieceX,
                pieceY
            )
        ) {

            currentPiece =
                rotated;

        }

    }


    /* =========================
       MOVE
    ========================= */

    function moveLeft() {

        if (
            !collision(
                currentPiece,
                pieceX - 1,
                pieceY
            )
        ) {

            pieceX--;

        }

    }


    function moveRight() {

        if (
            !collision(
                currentPiece,
                pieceX + 1,
                pieceY
            )
        ) {

            pieceX++;

        }

    }


    function moveDown() {

        if (
            !collision(
                currentPiece,
                pieceX,
                pieceY + 1
            )
        ) {

            pieceY++;

            return true;

        }


        merge();

        clearLines();

        newPiece();

        return false;

    }


    /* =========================
       HARD DROP
    ========================= */

    function hardDrop() {

        while (
            !collision(
                currentPiece,
                pieceX,
                pieceY + 1
            )
        ) {

            pieceY++;

        }


        merge();

        clearLines();

        newPiece();

    }


    /* =========================
       KEYBOARD
    ========================= */

    document.onkeydown =
        function(event) {

            if (!running) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                moveLeft();

            }


            else if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                moveRight();

            }


            else if (
                event.key ===
                "ArrowDown"
            ) {

                event.preventDefault();

                moveDown();

            }


            else if (
                event.key ===
                "ArrowUp"
            ) {

                event.preventDefault();

                rotatePiece();

            }


            else if (
                event.code === "Space"
            ) {

                event.preventDefault();

                hardDrop();

            }

        };


    /* =========================
       DRAW BLOCK
    ========================= */

    function drawBlock(
        x,
        y,
        color
    ) {

        ctx.fillStyle =
            color;


        ctx.fillRect(
            x * block,
            y * block,
            block,
            block
        );


        /* Block border */

        ctx.strokeStyle =
            "rgba(255,255,255,0.35)";

        ctx.lineWidth = 2;


        ctx.strokeRect(
            x * block + 1,
            y * block + 1,
            block - 2,
            block - 2
        );


        /* Small highlight */

        ctx.fillStyle =
            "rgba(255,255,255,0.18)";


        ctx.fillRect(
            x * block + 4,
            y * block + 4,
            block - 8,
            5
        );

    }


    /* =========================
       DRAW
    ========================= */

    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* Board */

        for (
            let y = 0;
            y < rows;
            y++
        ) {

            for (
                let x = 0;
                x < columns;
                x++
            ) {

                if (
                    board[y][x]
                ) {

                    drawBlock(
                        x,
                        y,
                        board[y][x]
                    );

                }

            }

        }


        /* Current piece */

        if (
            currentPiece
        ) {

            for (
                let y = 0;
                y < currentPiece.length;
                y++
            ) {

                for (
                    let x = 0;
                    x < currentPiece[y].length;
                    x++
                ) {

                    if (
                        currentPiece[y][x]
                    ) {

                        drawBlock(
                            pieceX + x,
                            pieceY + y,
                            currentColor
                        );

                    }

                }

            }

        }


        /* Grid */

        ctx.strokeStyle =
            "rgba(255,255,255,0.06)";

        ctx.lineWidth = 1;


        for (
            let x = 0;
            x <= columns;
            x++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x * block,
                0
            );

            ctx.lineTo(
                x * block,
                canvas.height
            );

            ctx.stroke();

        }


        for (
            let y = 0;
            y <= rows;
            y++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                0,
                y * block
            );

            ctx.lineTo(
                canvas.width,
                y * block
            );

            ctx.stroke();

        }

    }


    /* =========================
       GAME OVER
    ========================= */

    function gameOver() {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.72)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.textAlign =
            "center";


        ctx.font =
            "bold 38px Arial";


        ctx.fillText(
            t("gameOver"),
            canvas.width / 2,
            270
        );


        ctx.font =
            "20px Arial";


        ctx.fillText(
            "Score: " +
            currentScore,
            canvas.width / 2,
            310
        );

    }


    /* =========================
       GAME LOOP
    ========================= */

    function update(time = 0) {

        if (!running) {
            return;
        }


        const delta =
            time - lastTime;


        lastTime = time;


        dropTimer += delta;


        if (
            dropTimer >
            dropInterval
        ) {

            moveDown();

            dropTimer = 0;

        }


        draw();


        animationID =
            requestAnimationFrame(
                update
            );

    }


    /* =========================
       START
    ========================= */

    newPiece();

    draw();

    animationID =
        requestAnimationFrame(
            update
        );

}
function startSnake2() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 600;
    canvas.height = 450;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    const grid = 20;


    let snake = [
        { x: 300, y: 220 },
        { x: 280, y: 220 },
        { x: 260, y: 220 }
    ];


    let dx = 20;
    let dy = 0;

    let nextDX = dx;
    let nextDY = dy;


    let food = {};


    let running = true;


    // سرعت اولیه
    let moveDelay = 150;

    // هر غذا کمی سرعت را بیشتر می‌کند
    const speedIncrease = 4;

    // حداکثر سرعت
    const minimumDelay = 55;


    let lastMove = 0;


    function createFood() {

        do {

            food.x =
                Math.floor(
                    Math.random() * 29
                ) * grid + 20;

            food.y =
                Math.floor(
                    Math.random() * 21
                ) * grid + 20;

        } while (
            snake.some(
                part =>
                    part.x === food.x &&
                    part.y === food.y
            )
        );

    }


    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // FOOD

        ctx.fillStyle =
            "#ff4757";

        ctx.beginPath();

        ctx.arc(
            food.x,
            food.y,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // BODY

        for (
            let i = 1;
            i < snake.length;
            i++
        ) {

            ctx.fillStyle =
                "#4f9cff";

            ctx.fillRect(
                snake[i].x - 9,
                snake[i].y - 9,
                18,
                18
            );

        }


        // HEAD

        const head =
            snake[0];


        ctx.fillStyle =
            "#1677ff";


        ctx.beginPath();


        if (dx > 0) {

            ctx.moveTo(
                head.x + 12,
                head.y
            );

            ctx.lineTo(
                head.x - 8,
                head.y - 10
            );

            ctx.lineTo(
                head.x - 8,
                head.y + 10
            );

        }

        else if (dx < 0) {

            ctx.moveTo(
                head.x - 12,
                head.y
            );

            ctx.lineTo(
                head.x + 8,
                head.y - 10
            );

            ctx.lineTo(
                head.x + 8,
                head.y + 10
            );

        }

        else if (dy < 0) {

            ctx.moveTo(
                head.x,
                head.y - 12
            );

            ctx.lineTo(
                head.x - 10,
                head.y + 8
            );

            ctx.lineTo(
                head.x + 10,
                head.y + 8
            );

        }

        else {

            ctx.moveTo(
                head.x,
                head.y + 12
            );

            ctx.lineTo(
                head.x - 10,
                head.y - 8
            );

            ctx.lineTo(
                head.x + 10,
                head.y - 8
            );

        }


        ctx.closePath();

        ctx.fill();

    }


    function gameOver() {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.7)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 42px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            "Game Over",
            canvas.width / 2,
            210
        );


        ctx.font =
            "22px Arial";

        ctx.fillText(
            "Score: " +
            currentScore,
            canvas.width / 2,
            250
        );

    }


    document.onkeydown =
        function(event) {

            if (
                event.key === "ArrowUp" &&
                dy !== 20
            ) {

                nextDX = 0;
                nextDY = -20;

            }

            else if (
                event.key === "ArrowDown" &&
                dy !== -20
            ) {

                nextDX = 0;
                nextDY = 20;

            }

            else if (
                event.key === "ArrowLeft" &&
                dx !== 20
            ) {

                nextDX = -20;
                nextDY = 0;

            }

            else if (
                event.key === "ArrowRight" &&
                dx !== -20
            ) {

                nextDX = 20;
                nextDY = 0;

            }

        };


    function update() {

        if (!running) return;


        dx = nextDX;
        dy = nextDY;


        const head = {

            x: snake[0].x + dx,

            y: snake[0].y + dy

        };


        // برخورد با دیوار

        if (
            head.x < 20 ||
            head.x > canvas.width - 20 ||
            head.y < 20 ||
            head.y > canvas.height - 20
        ) {

            gameOver();

            return;

        }


        // برخورد با خودش

        for (
            let i = 0;
            i < snake.length;
            i++
        ) {

            if (
                head.x === snake[i].x &&
                head.y === snake[i].y
            ) {

                gameOver();

                return;

            }

        }


        snake.unshift(head);


        // خوردن غذا

        if (
            head.x === food.x &&
            head.y === food.y
        ) {

            currentScore += 10;

            updateScore();


            // مار دراز نمی‌شود
            // فقط کمی سریع‌تر می‌شود

            moveDelay =
                Math.max(
                    minimumDelay,
                    moveDelay -
                    speedIncrease
                );


            createFood();

        }


        // طول مار همیشه ثابت می‌ماند

        snake.pop();


        draw();

    }


    createFood();

    draw();


    function gameLoop(time) {

        if (!running) {
            return;
        }


        if (
            time - lastMove >=
            moveDelay
        ) {

            update();

            lastMove = time;

        }


        if (running) {

            animationID =
                requestAnimationFrame(
                    gameLoop
                );

        }

    }


    animationID =
        requestAnimationFrame(
            gameLoop
        );

}
function startPong2() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 500;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    const paddleWidth = 14;
    const paddleHeight = 90;

    const ballRadius = 10;


    let playerY =
        canvas.height / 2 -
        paddleHeight / 2;

    let aiY =
        canvas.height / 2 -
        paddleHeight / 2;


    let ballX =
        canvas.width / 2;

    let ballY =
        canvas.height / 2;


    const normalSpeed = 5;

    let ballDX = normalSpeed;
    let ballDY = 2.5;


    let playerScore = 0;
    let aiScore = 0;


    let running = true;


    const obstacles = [

        {
            x: 190,
            y: 145,
            width: 18,
            height: 100
        },

        {
            x: 190,
            y: 315,
            width: 18,
            height: 100
        },

        {
            x: 492,
            y: 145,
            width: 18,
            height: 100
        },

        {
            x: 492,
            y: 315,
            width: 18,
            height: 100
        }

    ];


    document.onmousemove =
        function(event) {

            const rect =
                canvas.getBoundingClientRect();

            playerY =
                event.clientY -
                rect.top -
                paddleHeight / 2;


            playerY =
                Math.max(
                    10,
                    Math.min(
                        canvas.height -
                        paddleHeight -
                        10,
                        playerY
                    )
                );

        };


    document.onkeydown =
        function(event) {

            if (
                event.key === "ArrowUp"
            ) {

                playerY -= 35;

            }

            else if (
                event.key === "ArrowDown"
            ) {

                playerY += 35;

            }


            playerY =
                Math.max(
                    10,
                    Math.min(
                        canvas.height -
                        paddleHeight -
                        10,
                        playerY
                    )
                );

        };


    function resetBall(direction) {

        ballX =
            canvas.width / 2;

        ballY =
            canvas.height / 2;


        ballDX =
            direction *
            normalSpeed;


        ballDY =
            (Math.random() * 4) - 2;

    }


    function circleRectCollision(
        cx,
        cy,
        radius,
        rx,
        ry,
        rw,
        rh
    ) {

        const closestX =
            Math.max(
                rx,
                Math.min(
                    cx,
                    rx + rw
                )
            );


        const closestY =
            Math.max(
                ry,
                Math.min(
                    cy,
                    ry + rh
                )
            );


        const distanceX =
            cx - closestX;

        const distanceY =
            cy - closestY;


        return (
            distanceX * distanceX +
            distanceY * distanceY
            <= radius * radius
        );

    }


    function hitPaddle(
        paddleX,
        paddleY
    ) {

        if (
            circleRectCollision(
                ballX,
                ballY,
                ballRadius,
                paddleX,
                paddleY,
                paddleWidth,
                paddleHeight
            )
        ) {

            const relativeY =
                (
                    ballY -
                    (
                        paddleY +
                        paddleHeight / 2
                    )
                ) /
                (paddleHeight / 2);


            const angle =
                relativeY *
                1.0;


            const speed =
                Math.min(
                    11,
                    Math.hypot(
                        ballDX,
                        ballDY
                    ) + 0.45
                );


            const direction =
                paddleX < canvas.width / 2
                    ? 1
                    : -1;


            ballDX =
                direction *
                speed *
                Math.cos(angle);


            ballDY =
                speed *
                Math.sin(angle);


            if (
                direction === 1
            ) {

                ballX =
                    paddleX +
                    paddleWidth +
                    ballRadius +
                    2;

            }

            else {

                ballX =
                    paddleX -
                    ballRadius -
                    2;

            }

        }

    }


    function hitObstacle(obstacle) {

        if (
            circleRectCollision(
                ballX,
                ballY,
                ballRadius,
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            )
        ) {

            const centerX =
                obstacle.x +
                obstacle.width / 2;

            const centerY =
                obstacle.y +
                obstacle.height / 2;


            const differenceX =
                ballX - centerX;

            const differenceY =
                ballY - centerY;


            if (
                Math.abs(differenceX) >
                Math.abs(differenceY)
            ) {

                ballDX *= -1;

                if (ballDX > 0) {

                    ballX =
                        obstacle.x +
                        obstacle.width +
                        ballRadius +
                        2;

                }

                else {

                    ballX =
                        obstacle.x -
                        ballRadius -
                        2;

                }

            }

            else {

                ballDY *= -1;

            }

        }

    }


    function draw() {

        ctx.fillStyle =
            "#0b1220";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // وسط زمین

        ctx.strokeStyle =
            "#3d4c63";

        ctx.lineWidth = 2;

        ctx.setLineDash([
            10,
            12
        ]);

        ctx.beginPath();

        ctx.moveTo(
            canvas.width / 2,
            0
        );

        ctx.lineTo(
            canvas.width / 2,
            canvas.height
        );

        ctx.stroke();

        ctx.setLineDash([]);


        // موانع

        for (
            const obstacle of obstacles
        ) {

            ctx.fillStyle =
                "#667085";

            ctx.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );


            ctx.fillStyle =
                "#8b98aa";

            ctx.fillRect(
                obstacle.x + 3,
                obstacle.y,
                4,
                obstacle.height
            );

        }


        // راکت بازیکن

        ctx.fillStyle =
            "#1677ff";

        ctx.fillRect(
            35,
            playerY,
            paddleWidth,
            paddleHeight
        );


        // راکت کامپیوتر

        ctx.fillStyle =
            "#ff4757";

        ctx.fillRect(
            canvas.width -
            35 -
            paddleWidth,
            aiY,
            paddleWidth,
            paddleHeight
        );


        // توپ

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            ballX,
            ballY,
            ballRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // امتیاز

        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 36px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            playerScore,
            canvas.width / 2 - 55,
            50
        );

        ctx.fillText(
            aiScore,
            canvas.width / 2 + 55,
            50
        );

    }


    function gameOver(message) {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.72)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 42px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            message,
            canvas.width / 2,
            235
        );


        ctx.font =
            "22px Arial";

        ctx.fillText(
            playerScore +
            " - " +
            aiScore,
            canvas.width / 2,
            275
        );

    }


    function update() {

        if (!running) {
            return;
        }


        // هوش مصنوعی

        const aiCenter =
            aiY +
            paddleHeight / 2;


        // عمداً کمی کندتر از توپ

        if (
            aiCenter <
            ballY - 12
        ) {

            aiY += 3.2;

        }

        else if (
            aiCenter >
            ballY + 12
        ) {

            aiY -= 3.2;

        }


        aiY =
            Math.max(
                10,
                Math.min(
                    canvas.height -
                    paddleHeight -
                    10,
                    aiY
                )
            );


        ballX += ballDX;
        ballY += ballDY;


        // دیوار بالا و پایین

        if (
            ballY -
            ballRadius <= 0
        ) {

            ballY =
                ballRadius;

            ballDY *= -1;

        }


        if (
            ballY +
            ballRadius >=
            canvas.height
        ) {

            ballY =
                canvas.height -
                ballRadius;

            ballDY *= -1;

        }


        // برخورد با موانع

        for (
            const obstacle of obstacles
        ) {

            hitObstacle(obstacle);

        }


        // راکت بازیکن

        hitPaddle(
            35,
            playerY
        );


        // راکت کامپیوتر

        hitPaddle(
            canvas.width -
            35 -
            paddleWidth,
            aiY
        );


        // گل بازیکن

        if (
            ballX < -ballRadius
        ) {

            aiScore++;

            resetBall(1);

        }


        // گل کامپیوتر

        if (
            ballX >
            canvas.width +
            ballRadius
        ) {

            playerScore++;

            currentScore += 10;

            updateScore();

            resetBall(-1);

        }


        // برنده

        if (
            playerScore >= 11
        ) {

            gameOver(
                "You Win!"
            );

            return;

        }


        if (
            aiScore >= 11
        ) {

            gameOver(
                "Computer Wins!"
            );

            return;

        }


        draw();


        animationID =
            requestAnimationFrame(
                update
            );

    }


    resetBall(
        Math.random() > 0.5
            ? 1
            : -1
    );


    draw();


    animationID =
        requestAnimationFrame(
            update
        );

}
function startMinesweeper() {

    const size = 10;
    const mineCount = 15;

    const board = document.createElement("div");

    board.style.display = "grid";
    board.style.gridTemplateColumns =
        "repeat(10, 42px)";
    board.style.gridTemplateRows =
        "repeat(10, 42px)";
    board.style.gap = "3px";

    gameArea.appendChild(board);


    let cells = [];
    let mines = [];
    let gameOver = false;
    let flags = 0;


    function createBoard() {

        board.innerHTML = "";

        cells = [];
        mines = [];
        flags = 0;
        gameOver = false;

        currentScore = 0;
        updateScore();


        // ساخت خانه‌ها

        for (let y = 0; y < size; y++) {

            cells[y] = [];

            for (let x = 0; x < size; x++) {

                const cell =
                    document.createElement("button");

                cell.style.width = "42px";
                cell.style.height = "42px";

                cell.style.border = "none";
                cell.style.borderRadius = "5px";

                cell.style.background =
                    "#1677ff";

                cell.style.color = "white";

                cell.style.fontSize = "18px";
                cell.style.fontWeight = "bold";

                cell.style.cursor = "pointer";

                cell.dataset.x = x;
                cell.dataset.y = y;

                cell.addEventListener(
                    "click",
                    function() {
                        revealCell(x, y);
                    }
                );


                cell.addEventListener(
                    "contextmenu",
                    function(event) {

                        event.preventDefault();

                        toggleFlag(x, y);

                    }
                );


                board.appendChild(cell);

                cells[y][x] = {
                    element: cell,
                    mine: false,
                    revealed: false,
                    flagged: false,
                    number: 0
                };

            }

        }


        // قرار دادن مین‌ها

        let placed = 0;

        while (placed < mineCount) {

            const x =
                Math.floor(
                    Math.random() * size
                );

            const y =
                Math.floor(
                    Math.random() * size
                );


            if (!cells[y][x].mine) {

                cells[y][x].mine = true;

                mines.push({
                    x: x,
                    y: y
                });

                placed++;

            }

        }


        // محاسبه اعداد

        for (let y = 0; y < size; y++) {

            for (let x = 0; x < size; x++) {

                if (cells[y][x].mine) {
                    continue;
                }


                let count = 0;


                for (
                    let dy = -1;
                    dy <= 1;
                    dy++
                ) {

                    for (
                        let dx = -1;
                        dx <= 1;
                        dx++
                    ) {

                        if (
                            dx === 0 &&
                            dy === 0
                        ) {
                            continue;
                        }


                        const nx = x + dx;
                        const ny = y + dy;


                        if (
                            nx >= 0 &&
                            nx < size &&
                            ny >= 0 &&
                            ny < size &&
                            cells[ny][nx].mine
                        ) {

                            count++;

                        }

                    }

                }


                cells[y][x].number = count;

            }

        }

    }


    function revealCell(x, y) {

        if (gameOver) {
            return;
        }


        const cell =
            cells[y][x];


        if (
            cell.revealed ||
            cell.flagged
        ) {
            return;
        }


        cell.revealed = true;


        // مین

        if (cell.mine) {

            cell.element.textContent = "💣";

            cell.element.style.background =
                "#ff4757";

            gameLost();

            return;

        }


        // خانه امن

        cell.element.style.background =
            "#eef5ff";

        cell.element.style.color =
            "#172033";

        cell.element.style.cursor =
            "default";


        if (cell.number > 0) {

            cell.element.textContent =
                cell.number;

        }


        currentScore += 1;

        updateScore();


        // اگر اطرافش مین نبود،
        // خانه‌های اطراف را باز کن

        if (cell.number === 0) {

            for (
                let dy = -1;
                dy <= 1;
                dy++
            ) {

                for (
                    let dx = -1;
                    dx <= 1;
                    dx++
                ) {

                    if (
                        dx === 0 &&
                        dy === 0
                    ) {
                        continue;
                    }


                    const nx = x + dx;
                    const ny = y + dy;


                    if (
                        nx >= 0 &&
                        nx < size &&
                        ny >= 0 &&
                        ny < size
                    ) {

                        revealCell(nx, ny);

                    }

                }

            }

        }


        checkWin();

    }


    function toggleFlag(x, y) {

        if (gameOver) {
            return;
        }


        const cell =
            cells[y][x];


        if (cell.revealed) {
            return;
        }


        if (cell.flagged) {

            cell.flagged = false;

            flags--;

            cell.element.textContent = "";

            cell.element.style.background =
                "#1677ff";

        }

        else {

            if (flags >= mineCount) {
                return;
            }


            cell.flagged = true;

            flags++;

            cell.element.textContent = "🚩";

        }

    }


    function checkWin() {

        let safeCells = 0;

        for (let y = 0; y < size; y++) {

            for (let x = 0; x < size; x++) {

                if (
                    !cells[y][x].mine &&
                    cells[y][x].revealed
                ) {

                    safeCells++;

                }

            }

        }


        if (
            safeCells ===
            size * size -
            mineCount
        ) {

            gameWon();

        }

    }


    function gameLost() {

        gameOver = true;


        for (const mine of mines) {

            const cell =
                cells[mine.y][mine.x];

            cell.element.textContent = "💣";

            cell.element.style.background =
                "#ff4757";

        }


        setTimeout(
            function() {

                const message =
                    document.createElement("div");

                message.textContent =
                    "💥 Game Over";

                message.style.position =
                    "absolute";

                message.style.fontSize =
                    "38px";

                message.style.fontWeight =
                    "bold";

                message.style.color =
                    "#ff4757";

                message.style.background =
                    "rgba(11,18,32,0.92)";

                message.style.padding =
                    "20px 35px";

                message.style.borderRadius =
                    "15px";

                gameArea.appendChild(message);

            },
            100
        );

    }


    function gameWon() {

        gameOver = true;


        currentScore += 100;

        updateScore();


        const message =
            document.createElement("div");

        message.textContent =
            "🏆 You Win!";

        message.style.position =
            "absolute";

        message.style.fontSize =
            "38px";

        message.style.fontWeight =
            "bold";

        message.style.color =
            "#22a06b";

        message.style.background =
            "rgba(255,255,255,0.95)";

        message.style.padding =
            "20px 35px";

        message.style.borderRadius =
            "15px";

        gameArea.appendChild(message);

    }


    createBoard();

}
function startDotHunter() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 900;
    canvas.height = 600;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    /*
        MAZE
        31 columns × 21 rows
    */

    const cols = 31;
    const rows = 21;

    const cellSize = 28;

    const mazeWidth = cols * cellSize;
    const mazeHeight = rows * cellSize;


    /*
        ساخت ماز
    */

    const maze = [];

    for (let y = 0; y < rows; y++) {

        maze[y] = [];

        for (let x = 0; x < cols; x++) {

            maze[y][x] = 1;

        }

    }


    function shuffle(array) {

        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                array[i],
                array[j]
            ] = [
                array[j],
                array[i]
            ];

        }

    }


    function generateMaze(x, y) {

        maze[y][x] = 0;


        const directions = [

            [2, 0],
            [-2, 0],
            [0, 2],
            [0, -2]

        ];


        shuffle(directions);


        for (const direction of directions) {

            const nx =
                x + direction[0];

            const ny =
                y + direction[1];


            if (
                nx > 0 &&
                nx < cols - 1 &&
                ny > 0 &&
                ny < rows - 1 &&
                maze[ny][nx] === 1
            ) {

                maze[
                    y + direction[1] / 2
                ][
                    x + direction[0] / 2
                ] = 0;


                generateMaze(
                    nx,
                    ny
                );

            }

        }

    }


    generateMaze(1, 1);


    /*
        چند مسیر اضافه برای
        جذاب‌تر شدن ماز
    */

    for (let i = 0; i < 35; i++) {

        const x =
            1 +
            Math.floor(
                Math.random() *
                (cols - 2)
            );

        const y =
            1 +
            Math.floor(
                Math.random() *
                (rows - 2)
            );


        if (
            x > 0 &&
            x < cols - 1 &&
            y > 0 &&
            y < rows - 1
        ) {

            maze[y][x] = 0;

        }

    }


    /*
        محل شروع
    */

    const player = {

        x: 1.5 * cellSize,

        y: 1.5 * cellSize,

        radius: 10,

        speed: 3.2,

        dx: 0,

        dy: 0,

        nextDX: 0,

        nextDY: 0

    };


    /*
        نقطه‌ها
    */

    const dots = [];


    for (let y = 1; y < rows - 1; y++) {

        for (let x = 1; x < cols - 1; x++) {

            if (
                maze[y][x] === 0 &&
                !(
                    x === 1 &&
                    y === 1
                )
            ) {

                dots.push({

                    x:
                        x * cellSize +
                        cellSize / 2,

                    y:
                        y * cellSize +
                        cellSize / 2,

                    eaten: false

                });

            }

        }

    }


    let remainingDots =
        dots.length;


    let timeLeft = 105;

    let running = true;

    let lastTime = performance.now();

    let mouthOpen = false;

    let mouthTimer = 0;


    /*
        کنترل
    */

    document.onkeydown =
        function(event) {

            if (
                event.key === "ArrowUp" ||
                event.key.toLowerCase() === "w"
            ) {

                player.nextDX = 0;
                player.nextDY = -1;

            }

            else if (
                event.key === "ArrowDown" ||
                event.key.toLowerCase() === "s"
            ) {

                player.nextDX = 0;
                player.nextDY = 1;

            }

            else if (
                event.key === "ArrowLeft" ||
                event.key.toLowerCase() === "a"
            ) {

                player.nextDX = -1;
                player.nextDY = 0;

            }

            else if (
                event.key === "ArrowRight" ||
                event.key.toLowerCase() === "d"
            ) {

                player.nextDX = 1;
                player.nextDY = 0;

            }

        };


    /*
        بررسی برخورد با دیوار
    */

    function isWall(x, y) {

        if (
            x < 0 ||
            y < 0 ||
            x >= mazeWidth ||
            y >= mazeHeight
        ) {

            return true;

        }


        const cellX =
            Math.floor(
                x / cellSize
            );

        const cellY =
            Math.floor(
                y / cellSize
            );


        return maze[cellY][cellX] === 1;

    }


    function canMove(x, y) {

        const r =
            player.radius - 2;


        return !(
            isWall(x - r, y - r) ||
            isWall(x + r, y - r) ||
            isWall(x - r, y + r) ||
            isWall(x + r, y + r)
        );

    }


    /*
        حرکت
    */

    function movePlayer(delta) {

        /*
            اگر مسیر بعدی آزاد باشد،
            جهت حرکت را تغییر بده
        */

        const nextX =
            player.x +
            player.nextDX *
            player.speed *
            delta;


        const nextY =
            player.y +
            player.nextDY *
            player.speed *
            delta;


        if (
            canMove(
                nextX,
                nextY
            )
        ) {

            player.dx =
                player.nextDX;

            player.dy =
                player.nextDY;

        }


        const moveX =
            player.x +
            player.dx *
            player.speed *
            delta;


        const moveY =
            player.y +
            player.dy *
            player.speed *
            delta;


        if (
            canMove(
                moveX,
                player.y
            )
        ) {

            player.x = moveX;

        }

        else {

            player.dx = 0;

        }


        if (
            canMove(
                player.x,
                moveY
            )
        ) {

            player.y = moveY;

        }

        else {

            player.dy = 0;

        }

    }


    /*
        خوردن نقطه‌ها
    */

    function eatDots() {

        for (const dot of dots) {

            if (dot.eaten) {
                continue;
            }


            const distance =
                Math.hypot(
                    player.x - dot.x,
                    player.y - dot.y
                );


            if (
                distance <
                player.radius + 5
            ) {

                dot.eaten = true;

                remainingDots--;

                currentScore += 10;

                updateScore();


                if (
                    remainingDots <= 0
                ) {

                    winGame();

                    return;

                }

            }

        }

    }


    /*
        رسم ماز
    */

    function drawMaze() {

        ctx.fillStyle =
            "#07101d";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const offsetX =
            (canvas.width -
                mazeWidth) / 2;


        const offsetY =
            (canvas.height -
                mazeHeight) / 2;


        for (let y = 0; y < rows; y++) {

            for (let x = 0; x < cols; x++) {

                if (
                    maze[y][x] === 1
                ) {

                    ctx.fillStyle =
                        "#1677ff";


                    ctx.fillRect(

                        offsetX +
                        x * cellSize,

                        offsetY +
                        y * cellSize,

                        cellSize,

                        cellSize

                    );


                    ctx.fillStyle =
                        "#075dcc";


                    ctx.fillRect(

                        offsetX +
                        x * cellSize + 3,

                        offsetY +
                        y * cellSize + 3,

                        cellSize - 6,

                        cellSize - 6

                    );

                }

            }

        }

    }


    /*
        رسم نقطه‌ها
    */

    function drawDots() {

        const offsetX =
            (canvas.width -
                mazeWidth) / 2;


        const offsetY =
            (canvas.height -
                mazeHeight) / 2;


        for (const dot of dots) {

            if (dot.eaten) {
                continue;
            }


            ctx.fillStyle =
                "#ffd166";


            ctx.beginPath();

            ctx.arc(

                offsetX + dot.x,

                offsetY + dot.y,

                3,

                0,

                Math.PI * 2

            );

            ctx.fill();

        }

    }


    /*
        رسم شخصیت
    */

    function drawPlayer() {

        const offsetX =
            (canvas.width -
                mazeWidth) / 2;


        const offsetY =
            (canvas.height -
                mazeHeight) / 2;


        const x =
            offsetX + player.x;

        const y =
            offsetY + player.y;


        /*
            جهت دهان
        */

        let angle = 0;


        if (player.dx < 0) {

            angle = Math.PI;

        }

        else if (player.dy < 0) {

            angle = -Math.PI / 2;

        }

        else if (player.dy > 0) {

            angle = Math.PI / 2;

        }


        const mouthSize =
            mouthOpen
                ? 0.65
                : 0.12;


        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(angle);


        /*
            بدن قرمز
        */

        ctx.fillStyle =
            "#e63946";


        ctx.beginPath();


        ctx.moveTo(
            0,
            0
        );


        ctx.arc(

            0,
            0,
            player.radius,

            mouthSize,

            Math.PI * 2 -
            mouthSize

        );


        ctx.closePath();

        ctx.fill();


        /*
            دندان‌های تیز
        */

        if (mouthOpen) {

            ctx.fillStyle =
                "#ffffff";


            /*
                دندان‌های بالا
            */

            for (
                let i = -1;
                i <= 1;
                i++
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    2,
                    i * 5 - 2
                );

                ctx.lineTo(
                    7,
                    i * 5
                );

                ctx.lineTo(
                    2,
                    i * 5 + 2
                );

                ctx.closePath();

                ctx.fill();

            }


            /*
                دندان‌های پایین
            */

            for (
                let i = -1;
                i <= 1;
                i++
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    2,
                    i * 5 - 2
                );

                ctx.lineTo(
                    7,
                    i * 5
                );

                ctx.lineTo(
                    2,
                    i * 5 + 2
                );

                ctx.closePath();

                ctx.fill();

            }

        }


        /*
            چشم
        */

        ctx.fillStyle =
            "#111827";


        ctx.beginPath();

        ctx.arc(
            -3,
            -5,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.restore();

    }


    /*
        متن زمان
    */

    function drawHUD() {

        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 24px Arial";

        ctx.textAlign =
            "left";


        ctx.fillText(
            t("time") + ": " +
            Math.ceil(timeLeft),
            18,
            32
        );


        ctx.textAlign =
            "right";


        ctx.fillText(
            t("dots") + ": " +
            remainingDots,
            canvas.width - 18,
            32
        );

    }


    /*
        پایان بازی
    */

    function endGame(title, subtitle) {

        running = false;


        ctx.fillStyle =
            "rgba(0,0,0,0.78)";


        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 48px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(
            title,
            canvas.width / 2,
            270
        );


        ctx.font =
            "22px Arial";


        ctx.fillText(
            subtitle,
            canvas.width / 2,
            310
        );

    }


    function winGame() {

    endGame(
        t("youWin"),
        t("allDotsCollected")
    );

}


function loseGame() {

    endGame(
        t("timeUp"),
        t("dots") + ": " +
        remainingDots
    );

}
    /*
        حلقه بازی
    */

    function gameLoop(time) {

        if (!running) {
            return;
        }


        const delta =
            Math.min(
                (time - lastTime) / 16.67,
                2
            );


        lastTime = time;


        timeLeft -=
            (time - lastTime + 16.67) /
            1000;


        /*
            اصلاح زمان برای جلوگیری
            از پرش شدید
        */

        if (timeLeft < 0) {
            timeLeft = 0;
        }


        movePlayer(delta);

        eatDots();


        /*
            انیمیشن دهان
        */

        mouthTimer += delta;


        if (
            mouthTimer >= 7
        ) {

            mouthTimer = 0;

            mouthOpen =
                !mouthOpen;

        }


        drawMaze();

        drawDots();

        drawPlayer();

        drawHUD();


        if (
            timeLeft <= 0 &&
            running
        ) {

            loseGame();

            return;

        }


        animationID =
            requestAnimationFrame(
                gameLoop
            );

    }


    /*
        شروع
    */

    drawMaze();

    drawDots();

    drawPlayer();

    drawHUD();


    animationID =
        requestAnimationFrame(
            gameLoop
        );

}

function startHelicopter() {

    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 500;
    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let helicopter = {
        x: 155,
        y: 250,
        vy: 0,
        angle: 0,
        targetAngle: 0
    };

    let obstacles = [];
    let distance = 0;
    let speed = 4;

    let rotorAngle = 0;
    let tailRotorAngle = 0;

    let lastTime = 0;
    let gameOver = false;

    /* =========================
       MOUSE CONTROL
    ========================= */

    let mouseY = helicopter.y;

    canvas.addEventListener("mousemove", function(e) {

        const rect = canvas.getBoundingClientRect();

        mouseY =
            e.clientY -
            rect.top;

        mouseY = Math.max(
            35,
            Math.min(
                canvas.height - 35,
                mouseY
            )
        );
    });

    /* =========================
       OBSTACLES
    ========================= */

    function createObstacle(x) {

        const gapHeight = 185;

        const gapY =
            70 +
            Math.random() *
            (canvas.height - gapHeight - 140);

        obstacles.push({
            x: x,
            width: 80,
            gapY: gapY,
            gapHeight: gapHeight,
            passed: false
        });
    }

    createObstacle(canvas.width + 250);
    createObstacle(canvas.width + 650);

    /* =========================
       DRAW HELICOPTER
    ========================= */

function drawHelicopter() {

    ctx.save();

    ctx.translate(
        helicopter.x,
        helicopter.y
    );

    ctx.rotate(
        helicopter.angle
    );

    /*
        دم هلیکوپتر
        ← سمت چپ = عقب
    */

    ctx.beginPath();

    ctx.moveTo(-25, -7);
    ctx.lineTo(-105, -18);
    ctx.lineTo(-112, -4);
    ctx.lineTo(-28, 10);

    ctx.closePath();

    ctx.fillStyle = "#263b50";
    ctx.fill();

    ctx.strokeStyle = "#0b1622";
    ctx.lineWidth = 4;
    ctx.stroke();

    /*
        باله دم
    */

    ctx.beginPath();

    ctx.moveTo(-90, -14);
    ctx.lineTo(-108, -38);
    ctx.lineTo(-118, -35);
    ctx.lineTo(-108, -5);

    ctx.closePath();

    ctx.fillStyle = "#304b63";
    ctx.fill();

    /*
        بدنه اصلی
        ← عقب
        → جلو
    */

    ctx.beginPath();

    ctx.moveTo(-42, 5);

    ctx.quadraticCurveTo(
        -38,
        -28,
        -5,
        -35
    );

    ctx.quadraticCurveTo(
        35,
        -38,
        55,
        -8
    );

    /*
        دماغه جلو
    */

    ctx.quadraticCurveTo(
        70,
        5,
        45,
        22
    );

    ctx.quadraticCurveTo(
        5,
        37,
        -35,
        25
    );

    ctx.quadraticCurveTo(
        -52,
        18,
        -42,
        5
    );

    ctx.closePath();

    const bodyGradient =
        ctx.createLinearGradient(
            0,
            -40,
            0,
            40
        );

    bodyGradient.addColorStop(
        0,
        "#526f89"
    );

    bodyGradient.addColorStop(
        0.5,
        "#29445b"
    );

    bodyGradient.addColorStop(
        1,
        "#162b3d"
    );

    ctx.fillStyle = bodyGradient;
    ctx.fill();

    ctx.strokeStyle = "#0a1724";
    ctx.lineWidth = 4;
    ctx.stroke();

    /*
        کابین جلو
    */

    ctx.beginPath();

    ctx.moveTo(-5, -29);

    ctx.quadraticCurveTo(
        25,
        -29,
        43,
        -8
    );

    ctx.quadraticCurveTo(
        48,
        3,
        36,
        9
    );

    ctx.quadraticCurveTo(
        12,
        16,
        -5,
        8
    );

    ctx.closePath();

    const glass =
        ctx.createLinearGradient(
            -10,
            -30,
            45,
            15
        );

    glass.addColorStop(
        0,
        "#9be2ff"
    );

    glass.addColorStop(
        0.5,
        "#2d8bbd"
    );

    glass.addColorStop(
        1,
        "#123e5b"
    );

    ctx.fillStyle = glass;
    ctx.fill();

    ctx.strokeStyle = "#082133";
    ctx.lineWidth = 3;
    ctx.stroke();

    /*
        انعکاس شیشه
    */

    ctx.beginPath();

    ctx.moveTo(5, -21);

    ctx.quadraticCurveTo(
        22,
        -28,
        35,
        -16
    );

    ctx.lineTo(20, -9);

    ctx.closePath();

    ctx.fillStyle =
        "rgba(255,255,255,0.3)";

    ctx.fill();

    /*
        پایه‌های فرود
    */

    ctx.strokeStyle = "#111c28";
    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(-28, 21);
    ctx.lineTo(-20, 38);

    ctx.moveTo(30, 20);
    ctx.lineTo(20, 38);

    ctx.stroke();

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(-28, 38);
    ctx.lineTo(28, 38);

    ctx.stroke();

    /*
        موتور
    */

    ctx.fillStyle = "#182a3c";

    ctx.beginPath();

    ctx.roundRect(
        -16,
        -47,
        32,
        12,
        5
    );

    ctx.fill();

    /*
        محور پره
    */

    ctx.fillStyle = "#101a25";

    ctx.beginPath();

    ctx.arc(
        0,
        -49,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
        پره اصلی
    */

    ctx.save();

    ctx.translate(
        0,
        -51
    );

    ctx.rotate(
        rotorAngle
    );

    ctx.fillStyle = "#101820";

    ctx.beginPath();

    ctx.roundRect(
        -110,
        -3,
        220,
        6,
        3
    );

    ctx.fill();

    ctx.restore();

    /*
        پره دم
    */

    ctx.save();

    ctx.translate(
        -108,
        -15
    );

    ctx.rotate(
        tailRotorAngle
    );

    ctx.strokeStyle = "#101820";
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(-18, 0);
    ctx.lineTo(18, 0);

    ctx.moveTo(0, -18);
    ctx.lineTo(0, 18);

    ctx.stroke();

    ctx.restore();

    ctx.restore();
}

    /* =========================
       BACKGROUND
    ========================= */

    function drawBackground() {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height
            );

        gradient.addColorStop(
            0,
            "#07111f"
        );

        gradient.addColorStop(
            1,
            "#102a42"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /*
            خطوط سرعت
        */

        ctx.strokeStyle =
            "rgba(120,180,220,0.08)";

        ctx.lineWidth = 2;

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const y =
                (
                    i * 43 +
                    distance * 0.7
                ) %
                canvas.height;

            ctx.beginPath();

            ctx.moveTo(
                canvas.width - 120,
                y
            );

            ctx.lineTo(
                canvas.width - 25,
                y
            );

            ctx.stroke();
        }
    }

    /* =========================
       DRAW BLOCKS
    ========================= */

    function drawObstacles() {

        for (const o of obstacles) {

            const blockGradient =
                ctx.createLinearGradient(
                    o.x,
                    0,
                    o.x + o.width,
                    0
                );

            blockGradient.addColorStop(
                0,
                "#12518a"
            );

            blockGradient.addColorStop(
                0.5,
                "#238bc8"
            );

            blockGradient.addColorStop(
                1,
                "#10446f"
            );

            /*
                بلوک‌های بالا
            */

            ctx.fillStyle = blockGradient;

            ctx.fillRect(
                o.x,
                0,
                o.width,
                o.gapY
            );

            /*
                خطوط بلوک‌های بالا
            */

            ctx.strokeStyle =
                "rgba(255,255,255,0.13)";

            ctx.lineWidth = 2;

            for (
                let y = 28;
                y < o.gapY;
                y += 32
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    o.x + 7,
                    y
                );

                ctx.lineTo(
                    o.x + o.width - 7,
                    y
                );

                ctx.stroke();
            }

            /*
                بلوک‌های پایین
            */

            const bottomY =
                o.gapY +
                o.gapHeight;

            ctx.fillStyle = blockGradient;

            ctx.fillRect(
                o.x,
                bottomY,
                o.width,
                canvas.height - bottomY
            );

            /*
                خطوط بلوک‌های پایین
            */

            for (
                let y = bottomY + 28;
                y < canvas.height;
                y += 32
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    o.x + 7,
                    y
                );

                ctx.lineTo(
                    o.x + o.width - 7,
                    y
                );

                ctx.stroke();
            }

            /*
                لبه‌های بلوک
            */

            ctx.fillStyle = "#55baf0";

            ctx.fillRect(
                o.x - 5,
                o.gapY - 8,
                o.width + 10,
                8
            );

            ctx.fillRect(
                o.x - 5,
                bottomY,
                o.width + 10,
                8
            );
        }
    }

    /* =========================
       HUD
    ========================= */

    function drawHUD() {

        ctx.fillStyle =
            "rgba(5,12,22,0.75)";

        ctx.beginPath();

        ctx.roundRect(
            18,
            18,
            175,
            58,
            12
        );

        ctx.fill();

        ctx.fillStyle = "#ffffff";

        ctx.font =
            "bold 18px Arial";

        ctx.fillText(
            "DISTANCE  " +
            Math.floor(distance / 10),
            35,
            53
        );
    }

    /* =========================
       COLLISION
    ========================= */

    function collision() {

        const hx = helicopter.x;
        const hy = helicopter.y;

        if (
            hy < 28 ||
            hy > canvas.height - 28
        ) {
            return true;
        }

        for (const o of obstacles) {

            const helicopterLeft =
                hx - 45;

            const helicopterRight =
                hx + 45;

            const helicopterTop =
                hy - 28;

            const helicopterBottom =
                hy + 28;

            const obstacleLeft =
                o.x;

            const obstacleRight =
                o.x + o.width;

            const topBlockBottom =
                o.gapY;

            const bottomBlockTop =
                o.gapY +
                o.gapHeight;

            if (
                helicopterRight >
                    obstacleLeft &&
                helicopterLeft <
                    obstacleRight
            ) {

                if (
                    helicopterTop <
                        topBlockBottom ||
                    helicopterBottom >
                        bottomBlockTop
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    /* =========================
       GAME OVER
    ========================= */

    function endGame() {

        gameOver = true;

        cancelAnimationFrame(
            animationID
        );

        ctx.fillStyle =
            "rgba(3,8,15,0.78)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.textAlign = "center";

        ctx.fillStyle = "#ffffff";

        ctx.font =
            "bold 48px Arial";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            canvas.height / 2 - 20
        );

        ctx.font =
            "20px Arial";

        ctx.fillStyle =
            "#a9c7df";

        ctx.fillText(
            "Distance: " +
            Math.floor(distance / 10),
            canvas.width / 2,
            canvas.height / 2 + 25
        );

        ctx.textAlign = "left";
    }

    /* =========================
       GAME LOOP
    ========================= */

    function gameLoop(timestamp) {

        if (gameOver) {
            return;
        }

        const delta =
            Math.min(
                (timestamp - lastTime) / 16.67,
                2
            );

        lastTime = timestamp;

        /*
            حرکت هلیکوپتر با موس
        */

        const difference =
            mouseY -
            helicopter.y;

        helicopter.vy +=
            difference *
            0.018 *
            delta;

        helicopter.vy *=
            Math.pow(
                0.88,
                delta
            );

        helicopter.vy =
            Math.max(
                -7,
                Math.min(
                    7,
                    helicopter.vy
                )
            );

        helicopter.y +=
            helicopter.vy *
            delta;

        /*
            زاویه هلیکوپتر
        */

        helicopter.targetAngle =
            Math.max(
                -0.45,
                Math.min(
                    0.45,
                    helicopter.vy * 0.07
                )
            );

        helicopter.angle +=
            (
                helicopter.targetAngle -
                helicopter.angle
            ) *
            0.12 *
            delta;

        /*
            پره‌ها
        */

        rotorAngle +=
            0.75 * delta;

        tailRotorAngle +=
            1.35 * delta;

        /*
            افزایش سرعت
        */

        distance +=
            speed * delta;

        speed =
            Math.min(
                12,
                4 +
                distance / 1800
            );

        /*
            حرکت بلوک‌ها
        */

        for (const o of obstacles) {

            o.x -=
                speed * delta;
        }

        /*
            ساخت بلوک جدید
        */

        const lastObstacle =
            obstacles[
                obstacles.length - 1
            ];

        if (
            lastObstacle &&
            lastObstacle.x <
                canvas.width - 350
        ) {

            createObstacle(
                canvas.width + 100
            );
        }

        /*
            حذف بلوک‌های قدیمی
        */

        obstacles =
            obstacles.filter(
                function(o) {

                    if (
                        !o.passed &&
                        o.x + o.width <
                            helicopter.x
                    ) {

                        o.passed = true;

                        currentScore += 10;
                        updateScore();
                    }

                    return (
                        o.x + o.width >
                        -100
                    );
                }
            );

        drawBackground();
        drawObstacles();
        drawHelicopter();
        drawHUD();

        if (collision()) {

            endGame();
            return;
        }

        animationID =
            requestAnimationFrame(
                gameLoop
            );
    }

    animationID =
        requestAnimationFrame(
            function(timestamp) {

                lastTime = timestamp;

                gameLoop(timestamp);
            }
        );
}
function startCoin() {

    const game = document.createElement("div");

    game.style.width = "100%";
    game.style.maxWidth = "760px";
    game.style.margin = "0 auto";
    game.style.textAlign = "center";
    game.style.fontFamily = "Arial, sans-serif";

    gameArea.appendChild(game);

    let round = 1;
    let score = 0;
    let lives = 8;
    let coinsFound = 0;
    let locked = false;

    let cards = [];

    // =========================
    // TOP 6 CARDS
    // =========================

    const topRow = document.createElement("div");

    topRow.style.display = "grid";
    topRow.style.gridTemplateColumns = "repeat(6, 1fr)";
    topRow.style.gap = "10px";

    game.appendChild(topRow);

    // =========================
    // MIDDLE HUD
    // =========================

    const hud = document.createElement("div");

    hud.style.display = "flex";
    hud.style.justifyContent = "center";
    hud.style.alignItems = "center";
    hud.style.gap = "35px";
    hud.style.margin = "25px 0";
    hud.style.fontSize = "20px";
    hud.style.fontWeight = "bold";

    game.appendChild(hud);

    const scoreDisplay = document.createElement("span");
    const livesDisplay = document.createElement("span");
    const roundDisplay = document.createElement("span");

    hud.appendChild(scoreDisplay);
    hud.appendChild(livesDisplay);
    hud.appendChild(roundDisplay);

    // =========================
    // BOTTOM 6 CARDS
    // =========================

    const bottomRow = document.createElement("div");

    bottomRow.style.display = "grid";
    bottomRow.style.gridTemplateColumns = "repeat(6, 1fr)";
    bottomRow.style.gap = "10px";

    game.appendChild(bottomRow);

    // =========================
    // UPDATE HUD
    // =========================

    function updateHUD() {

        scoreDisplay.textContent =
            "⭐ " + score;

        livesDisplay.textContent =
            "❤️".repeat(lives);

        roundDisplay.textContent =
            "🏆 " + round + "/5";
    }

    // =========================
    // SHUFFLE
    // =========================

    function shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j =
                Math.floor(Math.random() * (i + 1));

            const temp = array[i];

            array[i] = array[j];

            array[j] = temp;
        }
    }

    // =========================
    // CREATE CARD
    // =========================

    function createCard(index) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.textContent = "?";

        card.style.height = "100px";
        card.style.width = "100%";

        card.style.border = "none";
        card.style.borderRadius = "14px";

        card.style.background =
            "linear-gradient(145deg, #1976d2, #07549b)";

        card.style.color = "white";

        card.style.fontSize = "36px";
        card.style.fontWeight = "bold";

        card.style.cursor = "pointer";

        card.style.boxShadow =
            "0 5px 10px rgba(0,0,0,0.2)";

        card.onclick = function() {

            revealCard(card, index);
        };

        return card;
    }

    // =========================
    // START ROUND
    // =========================

    function startRound() {

        topRow.innerHTML = "";
        bottomRow.innerHTML = "";

        cards = [];

        coinsFound = 0;

        locked = false;

        // 8 سکه

        for (let i = 0; i < 8; i++) {

            cards.push("coin");
        }

        // 4 بمب

        for (let i = 0; i < 4; i++) {

            cards.push("bomb");
        }

        // تصادفی کردن

        shuffle(cards);

        // ساخت 12 کارت

        for (let i = 0; i < 12; i++) {

            const card = createCard(i);

            if (i < 6) {

                topRow.appendChild(card);

            } else {

                bottomRow.appendChild(card);
            }
        }

        updateHUD();
    }

    // =========================
    // REVEAL CARD
    // =========================

    function revealCard(card, index) {

        if (locked) {
            return;
        }

        if (card.dataset.opened === "yes") {
            return;
        }

        card.dataset.opened = "yes";

        card.style.cursor = "default";

        if (cards[index] === "coin") {

            // 🪙 COIN

            card.textContent = "🪙";

            card.style.background =
                "linear-gradient(145deg, #ffd84d, #d89b00)";

            coinsFound++;

            score += 10;

            updateHUD();

            // همه 8 سکه پیدا شدند

            if (coinsFound === 8) {

                locked = true;

                setTimeout(function() {

                    if (round === 5) {

                        winGame();

                    } else {

                        round++;

                        startRound();
                    }

                }, 900);
            }

        } else {

            // 💣 BOMB

            card.textContent = "💣";

            card.style.background =
                "linear-gradient(145deg, #555, #222)";

            lives--;

            updateHUD();

            // جان‌ها تمام شدند

            if (lives === 0) {

                locked = true;

                setTimeout(function() {

                    loseGame();

                }, 700);
            }
        }
    }

    // =========================
    // GAME OVER
    // =========================

    function loseGame() {

        locked = true;

        game.innerHTML = "";

        const result =
            document.createElement("div");

        result.style.padding = "45px 20px";

        result.innerHTML = `
            <div style="font-size:60px;">
                💣
            </div>

            <h2 style="font-size:38px;">
                GAME OVER
            </h2>

            <p style="font-size:20px;">
                You ran out of hearts!
            </p>

            <p style="font-size:22px;font-weight:bold;">
                ⭐ Score: ${score}
            </p>
        `;

        game.appendChild(result);
    }

    // =========================
    // WIN
    // =========================

    function winGame() {

        locked = true;

        game.innerHTML = "";

        const result =
            document.createElement("div");

        result.style.padding = "45px 20px";

        result.innerHTML = `
            <div style="font-size:65px;">
                🏆
            </div>

            <h2 style="font-size:40px;">
                YOU WIN!
            </h2>

            <p style="font-size:21px;">
                You completed all 5 rounds!
            </p>

            <p style="font-size:23px;font-weight:bold;">
                ⭐ Final Score: ${score}
            </p>

            <p style="font-size:21px;">
                ❤️ ${lives} hearts remaining
            </p>
        `;

        game.appendChild(result);
    }

    // =========================
    // START
    // =========================

    startRound();
}
function startDiscThief() {

    const game = document.createElement("div");

    game.style.width = "100%";
    game.style.maxWidth = "760px";
    game.style.margin = "0 auto";
    game.style.textAlign = "center";
    game.style.fontFamily = "Arial, sans-serif";

    gameArea.appendChild(game);

    let score = 5;
    let timeLeft = 70;
    let activeItem = null;
    let itemVisible = false;
    let gameOver = false;

    currentScore = score;
    updateScore();

    const info = document.createElement("div");

    info.style.display = "flex";
    info.style.justifyContent = "center";
    info.style.gap = "50px";
    info.style.fontSize = "22px";
    info.style.fontWeight = "bold";
    info.style.marginBottom = "30px";

    game.appendChild(info);

    const scoreDisplay = document.createElement("span");
    const timeDisplay = document.createElement("span");

    info.appendChild(scoreDisplay);
    info.appendChild(timeDisplay);

    const target = document.createElement("div");

    target.style.width = "260px";
    target.style.height = "260px";
    target.style.margin = "0 auto";
    target.style.borderRadius = "20px";
    target.style.background =
        "linear-gradient(145deg, #1976d2, #07549b)";
    target.style.display = "flex";
    target.style.alignItems = "center";
    target.style.justifyContent = "center";
    target.style.fontSize = "110px";
    target.style.boxShadow =
        "0 8px 20px rgba(0,0,0,0.2)";
    target.textContent = "?";

    game.appendChild(target);

    const instruction = document.createElement("p");

    instruction.textContent =
        "Press SPACE when the item appears!";

    instruction.style.fontSize = "19px";
    instruction.style.fontWeight = "bold";
    instruction.style.marginTop = "25px";

    game.appendChild(instruction);


    function updateHUD() {

        scoreDisplay.textContent =
            "⭐ Score: " + score;

        timeDisplay.textContent =
            "⏱️ Time: " + Math.max(0, timeLeft);

        currentScore = score;
        updateScore();
    }


    function randomItem() {

        const items = [
            "normal",
            "gold",
            "cassette",
            "explosion"
        ];

        return items[
            Math.floor(Math.random() * items.length)
        ];
    }


    function showItem() {

        if (gameOver) {
            return;
        }

        activeItem = randomItem();
        itemVisible = true;

        if (activeItem === "normal") {
            target.textContent = "💿";
        }

        else if (activeItem === "gold") {
            target.textContent = "📀";
        }

        else if (activeItem === "cassette") {
            target.textContent = "📼";
        }

        else if (activeItem === "explosion") {
            target.textContent = "💥";
        }

        setTimeout(function() {

            if (gameOver) {
                return;
            }

            itemVisible = false;
            activeItem = null;
            target.textContent = "?";

        }, 600);
    }


    function handleSpace(event) {

        if (
            event.code !== "Space" ||
            gameOver
        ) {
            return;
        }

        event.preventDefault();

        if (!itemVisible || !activeItem) {
            return;
        }

        itemVisible = false;

        const item = activeItem;

        activeItem = null;
        target.textContent = "?";


        if (item === "normal") {

            const points =
                Math.floor(
                    Math.random() * 6
                ) + 10;

            score += points;
        }


        else if (item === "gold") {

            const points =
                Math.floor(
                    Math.random() * 6
                ) + 20;

            score += points;
        }


        else if (item === "cassette") {

            if (Math.random() < 0.5) {
                score += 5;
            } else {
                timeLeft += 10;
            }
        }


        else if (item === "explosion") {

            if (Math.random() < 0.5) {
                score -= 10;
            } else {
                timeLeft -= 5;
            }
        }


        if (score < 0) {
            score = 0;
        }

        updateHUD();


        if (score <= 0) {
            loseGame();
        }
    }


    function loseGame() {

        if (gameOver) {
            return;
        }

        gameOver = true;

        document.removeEventListener(
            "keydown",
            handleSpace
        );

        clearInterval(itemTimer);
        clearInterval(timeTimer);

        game.innerHTML = "";

        const result = document.createElement("div");

        result.style.padding = "50px 20px";

        result.innerHTML = `
            <div style="font-size:65px;">
                💥
            </div>

            <h2 style="font-size:40px;">
                GAME OVER
            </h2>

            <p style="font-size:21px;">
                You lost!
            </p>

            <p style="font-size:23px;font-weight:bold;">
                ⭐ Score: ${score}
            </p>
        `;

        game.appendChild(result);
    }


    function winGame() {

        if (gameOver) {
            return;
        }

        gameOver = true;

        document.removeEventListener(
            "keydown",
            handleSpace
        );

        clearInterval(itemTimer);
        clearInterval(timeTimer);

        game.innerHTML = "";

        const result = document.createElement("div");

        result.style.padding = "50px 20px";

        result.innerHTML = `
            <div style="font-size:65px;">
                🏆
            </div>

            <h2 style="font-size:40px;">
                YOU WIN!
            </h2>

            <p style="font-size:21px;">
                You survived until the end!
            </p>

            <p style="font-size:23px;font-weight:bold;">
                ⭐ Final Score: ${score}
            </p>
        `;

        game.appendChild(result);
    }


    document.addEventListener(
        "keydown",
        handleSpace
    );


    const itemTimer = setInterval(
        showItem,
        3000
    );


    const timeTimer = setInterval(
        function() {

            if (gameOver) {
                return;
            }

            timeLeft--;

            updateHUD();

            if (timeLeft <= 0) {

                timeLeft = 0;

                updateHUD();

                if (score >= 250) {
                    winGame();
                } else {
                    loseGame();
                }
            }

        },
        1000
    );


    updateHUD();

    // اولین نمایش بعد از 3 ثانیه
}
function start2048() {

    const game = document.createElement("div");

    game.style.width = "100%";
    game.style.maxWidth = "460px";
    game.style.margin = "0 auto";
    game.style.textAlign = "center";
    game.style.fontFamily = "Arial, sans-serif";

    gameArea.appendChild(game);

    let board = [];
    let score = 0;
    let gameEnded = false;

    const scoreDisplay = document.createElement("div");

    scoreDisplay.style.fontSize = "22px";
    scoreDisplay.style.fontWeight = "bold";
    scoreDisplay.style.marginBottom = "15px";

    game.appendChild(scoreDisplay);


    const boardElement = document.createElement("div");

    boardElement.style.display = "grid";
    boardElement.style.gridTemplateColumns = "repeat(4, 1fr)";
    boardElement.style.gap = "10px";
    boardElement.style.padding = "10px";
    boardElement.style.background = "#9e948a";
    boardElement.style.borderRadius = "12px";

    game.appendChild(boardElement);


    function createBoard() {

        board = [];

        for (let y = 0; y < 4; y++) {

            board[y] = [];

            for (let x = 0; x < 4; x++) {
                board[y][x] = 0;
            }
        }

        addRandomTile();
        addRandomTile();

        drawBoard();
    }


    function addRandomTile() {

        const empty = [];

        for (let y = 0; y < 4; y++) {

            for (let x = 0; x < 4; x++) {

                if (board[y][x] === 0) {
                    empty.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        if (empty.length === 0) {
            return;
        }

        const position =
            empty[Math.floor(Math.random() * empty.length)];

        board[position.y][position.x] =
            Math.random() < 0.9 ? 2 : 4;
    }


    function getTileColor(value) {

        const colors = {
            0: "#cdc1b4",
            2: "#eee4da",
            4: "#ede0c8",
            8: "#f2b179",
            16: "#f59563",
            32: "#f67c5f",
            64: "#f65e3b",
            128: "#edcf72",
            256: "#edcc61",
            512: "#edc850",
            1024: "#edc53f",
            2048: "#edc22e"
        };

        return colors[value] || "#3c3a32";
    }


    function drawBoard() {

        boardElement.innerHTML = "";

        scoreDisplay.textContent =
            "⭐ Score: " + score;

        currentScore = score;
        updateScore();

        for (let y = 0; y < 4; y++) {

            for (let x = 0; x < 4; x++) {

                const value = board[y][x];

                const tile = document.createElement("div");

                tile.style.height = "90px";
                tile.style.borderRadius = "8px";
                tile.style.background =
                    getTileColor(value);

                tile.style.display = "flex";
                tile.style.alignItems = "center";
                tile.style.justifyContent = "center";

                tile.style.fontWeight = "bold";
                tile.style.fontSize =
                    value >= 1024 ? "28px" : "36px";

                tile.style.color =
                    value <= 4 ? "#776e65" : "#ffffff";

                tile.textContent =
                    value === 0 ? "" : value;

                boardElement.appendChild(tile);
            }
        }
    }


    function slide(row) {

        const filtered =
            row.filter(value => value !== 0);

        const result = [];

        for (let i = 0; i < filtered.length; i++) {

            if (
                i + 1 < filtered.length &&
                filtered[i] === filtered[i + 1]
            ) {

                const merged =
                    filtered[i] * 2;

                result.push(merged);

                score += merged;

                i++;

            } else {

                result.push(filtered[i]);
            }
        }

        while (result.length < 4) {
            result.push(0);
        }

        return result;
    }


    function moveLeft() {

        let changed = false;

        for (let y = 0; y < 4; y++) {

            const oldRow =
                board[y].slice();

            const newRow =
                slide(oldRow);

            board[y] = newRow;

            if (
                JSON.stringify(oldRow) !==
                JSON.stringify(newRow)
            ) {
                changed = true;
            }
        }

        return changed;
    }


    function moveRight() {

        let changed = false;

        for (let y = 0; y < 4; y++) {

            const oldRow =
                board[y].slice();

            const reversed =
                oldRow.reverse();

            const newRow =
                slide(reversed).reverse();

            board[y] = newRow;

            if (
                JSON.stringify(oldRow.reverse()) !==
                JSON.stringify(newRow)
            ) {
                changed = true;
            }
        }

        return changed;
    }


    function moveUp() {

        let changed = false;

        for (let x = 0; x < 4; x++) {

            const column = [];

            for (let y = 0; y < 4; y++) {
                column.push(board[y][x]);
            }

            const oldColumn =
                column.slice();

            const newColumn =
                slide(column);

            for (let y = 0; y < 4; y++) {
                board[y][x] = newColumn[y];
            }

            if (
                JSON.stringify(oldColumn) !==
                JSON.stringify(newColumn)
            ) {
                changed = true;
            }
        }

        return changed;
    }


    function moveDown() {

        let changed = false;

        for (let x = 0; x < 4; x++) {

            const column = [];

            for (let y = 0; y < 4; y++) {
                column.push(board[y][x]);
            }

            const oldColumn =
                column.slice();

            const reversed =
                column.reverse();

            const newColumn =
                slide(reversed).reverse();

            for (let y = 0; y < 4; y++) {
                board[y][x] = newColumn[y];
            }

            if (
                JSON.stringify(oldColumn) !==
                JSON.stringify(newColumn)
            ) {
                changed = true;
            }
        }

        return changed;
    }


    function has2048() {

        for (let y = 0; y < 4; y++) {

            for (let x = 0; x < 4; x++) {

                if (board[y][x] === 2048) {
                    return true;
                }
            }
        }

        return false;
    }


    function canMove() {

        for (let y = 0; y < 4; y++) {

            for (let x = 0; x < 4; x++) {

                if (board[y][x] === 0) {
                    return true;
                }

                if (
                    x < 3 &&
                    board[y][x] === board[y][x + 1]
                ) {
                    return true;
                }

                if (
                    y < 3 &&
                    board[y][x] === board[y + 1][x]
                ) {
                    return true;
                }
            }
        }

        return false;
    }


    function endGame(won) {

        gameEnded = true;

        document.removeEventListener(
            "keydown",
            handleKey
        );

        game.innerHTML = "";

        const result = document.createElement("div");

        result.style.padding = "45px 20px";

        if (won) {

            result.innerHTML = `
                <div style="font-size:65px;">
                    🏆
                </div>

                <h2 style="font-size:40px;">
                    YOU WIN!
                </h2>

                <p style="font-size:22px;font-weight:bold;">
                    You reached 2048!
                </p>

                <p style="font-size:23px;">
                    ⭐ Score: ${score}
                </p>
            `;

        } else {

            result.innerHTML = `
                <div style="font-size:65px;">
                    💀
                </div>

                <h2 style="font-size:40px;">
                    GAME OVER
                </h2>

                <p style="font-size:22px;">
                    No more moves!
                </p>

                <p style="font-size:23px;font-weight:bold;">
                    ⭐ Score: ${score}
                </p>
            `;
        }

        game.appendChild(result);
    }


    function handleKey(event) {

        if (gameEnded) {
            return;
        }

        let changed = false;

        if (event.key === "ArrowLeft") {
            changed = moveLeft();
        }

        else if (event.key === "ArrowRight") {
            changed = moveRight();
        }

        else if (event.key === "ArrowUp") {
            changed = moveUp();
        }

        else if (event.key === "ArrowDown") {
            changed = moveDown();
        }

        else {
            return;
        }

        event.preventDefault();

        if (changed) {

            addRandomTile();
            drawBoard();

            if (has2048()) {
                endGame(true);
                return;
            }

            if (!canMove()) {
                endGame(false);
            }
        }
    }


    document.addEventListener(
        "keydown",
        handleKey
    );

    createBoard();
}
function startDuel() {

    const canvas = document.createElement("canvas");

    canvas.width = 900;
    canvas.height = 600;

    canvas.className = "game-canvas";

    gameArea.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // =========================
    // GAME SETTINGS
    // =========================

    const arena = {
        x: 30,
        y: 30,
        width: 840,
        height: 540
    };

    const player = {
        x: 220,
        y: 300,
        radius: 28,
        hp: 100,
        speed: 3.2,
        angle: 0,
        moving: false,
        attacking: false,
        attackTime: 0,
        attackCooldown: 0
    };

    const enemy = {
        x: 680,
        y: 300,
        radius: 28,
        hp: 100,
        speed: 1.8,
        angle: Math.PI,
        moving: false,
        attacking: false,
        attackTime: 0,
        attackCooldown: 0
    };

    const keys = {};

    let gameOver = false;
    let winner = "";

    // =========================
    // KEYBOARD
    // =========================

    document.onkeydown = function(e) {

        keys[e.key.toLowerCase()] = true;

        if (
            e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === " "
        ) {
            e.preventDefault();
        }

    };

    document.onkeyup = function(e) {

        keys[e.key.toLowerCase()] = false;

    };

    // =========================
    // MOUSE ATTACK
    // =========================

    canvas.onmousedown = function(e) {

        if (e.button !== 0) {
            return;
        }

        attackPlayer();

    };

    // =========================
    // PLAYER ATTACK
    // =========================

    function attackPlayer() {

        if (gameOver) {
            return;
        }

        if (player.attackCooldown > 0) {
            return;
        }

        player.attacking = true;
        player.attackTime = 18;
        player.attackCooldown = 35;

        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;

        const distance = Math.hypot(dx, dy);

        player.angle = Math.atan2(dy, dx);

        // Sword range
        if (distance < 85) {

            enemy.hp -= 10;

            if (enemy.hp < 0) {
                enemy.hp = 0;
            }

            if (enemy.hp <= 0) {

                gameOver = true;
                winner = "YOU WIN!";

            }

        }

    }

    // =========================
    // ENEMY ATTACK
    // =========================

    function attackEnemy() {

        if (gameOver) {
            return;
        }

        if (enemy.attackCooldown > 0) {
            return;
        }

        enemy.attacking = true;
        enemy.attackTime = 18;
        enemy.attackCooldown = 55;

        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;

        const distance = Math.hypot(dx, dy);

        enemy.angle = Math.atan2(dy, dx);

        if (distance < 78) {

            player.hp -= 10;

            if (player.hp < 0) {
                player.hp = 0;
            }

            if (player.hp <= 0) {

                gameOver = true;
                winner = "DEFEAT!";

            }

        }

    }

    // =========================
    // PLAYER MOVEMENT
    // =========================

    function updatePlayer() {

        if (gameOver) {
            return;
        }

        let dx = 0;
        let dy = 0;

        if (keys["w"] || keys["arrowup"]) {
            dy -= 1;
        }

        if (keys["s"] || keys["arrowdown"]) {
            dy += 1;
        }

        if (keys["a"] || keys["arrowleft"]) {
            dx -= 1;
        }

        if (keys["d"] || keys["arrowright"]) {
            dx += 1;
        }

        if (dx !== 0 || dy !== 0) {

            player.moving = true;

            const length = Math.hypot(dx, dy);

            dx /= length;
            dy /= length;

            player.x += dx * player.speed;
            player.y += dy * player.speed;

            player.angle = Math.atan2(dy, dx);

        }
        else {

            player.moving = false;

        }

        // Arena boundaries

        player.x = Math.max(
            arena.x + player.radius,
            Math.min(
                arena.x + arena.width - player.radius,
                player.x
            )
        );

        player.y = Math.max(
            arena.y + player.radius,
            Math.min(
                arena.y + arena.height - player.radius,
                player.y
            )
        );

    }

    // =========================
    // ENEMY AI
    // =========================

    function updateEnemy() {

        if (gameOver) {
            return;
        }

        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;

        const distance = Math.hypot(dx, dy);

        enemy.angle = Math.atan2(dy, dx);

        if (distance > 62) {

            enemy.moving = true;

            enemy.x +=
                (dx / distance) *
                enemy.speed;

            enemy.y +=
                (dy / distance) *
                enemy.speed;

        }
        else {

            enemy.moving = false;

            attackEnemy();

        }

    }

    // =========================
    // DRAW HEALTH BAR
    // =========================

    function drawHealthBar(x, y, hp, label) {

        const width = 150;
        const height = 16;

        ctx.fillStyle = "#111827";

        ctx.fillRect(
            x - width / 2,
            y,
            width,
            height
        );

        ctx.fillStyle = "#35c759";

        ctx.fillRect(
            x - width / 2,
            y,
            width * (hp / 100),
            height
        );

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.strokeRect(
            x - width / 2,
            y,
            width,
            height
        );

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Arial";
       ctx.textAlign = "center";

       ctx.fillText(
           label + " " + hp,
           x,
           y - 7
 );

}

    // =========================
    // DRAW GRAY KNIGHT
    // =========================

    function drawGrayKnight(knight) {

        ctx.save();

        ctx.translate(knight.x, knight.y);

        ctx.rotate(knight.angle);

        // Shadow

        ctx.fillStyle = "rgba(0,0,0,0.25)";

        ctx.beginPath();

        ctx.ellipse(
            0,
            10,
            30,
            18,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Cape

        ctx.fillStyle = "#555b64";

        ctx.beginPath();

        ctx.moveTo(-20, -17);
        ctx.lineTo(-34, 0);
        ctx.lineTo(-20, 20);
        ctx.lineTo(2, 14);
        ctx.lineTo(2, -14);

        ctx.closePath();

        ctx.fill();

        // Body armor

        ctx.fillStyle = "#9aa0a8";

        ctx.beginPath();

        ctx.roundRect(
            -18,
            -18,
            35,
            36,
            9
        );

        ctx.fill();

        ctx.strokeStyle = "#30343a";
        ctx.lineWidth = 3;

        ctx.stroke();

        // Helmet

        ctx.fillStyle = "#c7ccd2";

        ctx.beginPath();

        ctx.arc(
            14,
            0,
            15,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.stroke();

        // Helmet visor

        ctx.fillStyle = "#25282d";

        ctx.fillRect(
            19,
            -8,
            10,
            16
        );

        // Shield

        ctx.fillStyle = "#747b84";

        ctx.beginPath();

        ctx.moveTo(
            -10,
            -16
        );

        ctx.lineTo(
            -27,
            -10
        );

        ctx.lineTo(
            -27,
            10
        );

        ctx.lineTo(
            -10,
            16
        );

        ctx.closePath();

        ctx.fill();

        ctx.stroke();

        // Sword

        drawSword(
            knight.attacking,
            knight.attackTime
        );

        ctx.restore();

        drawHealthBar(
            knight.x,
            knight.y - 48,
            knight.hp,
            "YOU"
        );

    }

    // =========================
    // DRAW BLACK KNIGHT
    // =========================

    function drawBlackKnight(knight) {

        ctx.save();

        ctx.translate(knight.x, knight.y);

        ctx.rotate(knight.angle);

        // Shadow

        ctx.fillStyle = "rgba(0,0,0,0.35)";

        ctx.beginPath();

        ctx.ellipse(
            0,
            10,
            30,
            18,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Cape

        ctx.fillStyle = "#111318";

        ctx.beginPath();

        ctx.moveTo(-20, -17);
        ctx.lineTo(-34, 0);
        ctx.lineTo(-20, 20);
        ctx.lineTo(2, 14);
        ctx.lineTo(2, -14);

        ctx.closePath();

        ctx.fill();

        // Armor

        ctx.fillStyle = "#30343b";

        ctx.beginPath();

        ctx.roundRect(
            -18,
            -18,
            35,
            36,
            9
        );

        ctx.fill();

        ctx.strokeStyle = "#090a0d";
        ctx.lineWidth = 3;

        ctx.stroke();

        // Helmet

        ctx.fillStyle = "#181b20";

        ctx.beginPath();

        ctx.arc(
            14,
            0,
            15,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.stroke();

        // Visor

        ctx.fillStyle = "#050608";

        ctx.fillRect(
            19,
            -8,
            10,
            16
        );

        // Shield

        ctx.fillStyle = "#242830";

        ctx.beginPath();

        ctx.moveTo(
            -10,
            -16
        );

        ctx.lineTo(
            -27,
            -10
        );

        ctx.lineTo(
            -27,
            10
        );

        ctx.lineTo(
            -10,
            16
        );

        ctx.closePath();

        ctx.fill();

        ctx.stroke();

        // Sword

        drawSword(
            knight.attacking,
            knight.attackTime
        );

        ctx.restore();

        drawHealthBar(
            knight.x,
            knight.y - 48,
            knight.hp,
            "ENEMY"
        );

    }

    // =========================
    // SWORD
    // =========================

    function drawSword(attacking, attackTime) {

        let swordAngle = 0.7;

        if (attacking) {

            swordAngle =
                -0.9 +
                (18 - attackTime) *
                0.1;

        }

        ctx.save();

        ctx.rotate(swordAngle);

        // Arm

        ctx.strokeStyle = "#9fa5ad";
        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.moveTo(5, -9);
        ctx.lineTo(25, -15);

        ctx.stroke();

        // Handle

        ctx.strokeStyle = "#5b3a24";
        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(23, -15);
        ctx.lineTo(35, -15);

        ctx.stroke();

        // Guard

        ctx.strokeStyle = "#c7a94b";
        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(28, -23);
        ctx.lineTo(28, -7);

        ctx.stroke();

        // Blade

        ctx.fillStyle = "#e7edf4";

        ctx.beginPath();

        ctx.moveTo(32, -18);
        ctx.lineTo(75, -13);
        ctx.lineTo(75, -17);
        ctx.lineTo(32, -22);

        ctx.closePath();

        ctx.fill();

        ctx.strokeStyle = "#777e87";
        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();

    }

    // =========================
    // UPDATE
    // =========================

    function update() {

        updatePlayer();
        updateEnemy();

        if (player.attackCooldown > 0) {
            player.attackCooldown--;
        }

        if (enemy.attackCooldown > 0) {
            enemy.attackCooldown--;
        }

        if (player.attackTime > 0) {

            player.attackTime--;

        }
        else {

            player.attacking = false;

        }

        if (enemy.attackTime > 0) {

            enemy.attackTime--;

        }
        else {

            enemy.attacking = false;

        }

    }

    // =========================
    // DRAW ARENA
    // =========================

    function drawArena() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Background

        ctx.fillStyle = "#18212b";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Arena floor

        ctx.fillStyle = "#5b6873";

        ctx.fillRect(
            arena.x,
            arena.y,
            arena.width,
            arena.height
        );

        // Floor pattern

        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;

        for (
            let x = arena.x;
            x <= arena.x + arena.width;
            x += 40
        ) {

            ctx.beginPath();

            ctx.moveTo(x, arena.y);
            ctx.lineTo(x, arena.y + arena.height);

            ctx.stroke();

        }

        for (
            let y = arena.y;
            y <= arena.y + arena.height;
            y += 40
        ) {

            ctx.beginPath();

            ctx.moveTo(arena.x, y);
            ctx.lineTo(arena.x + arena.width, y);

            ctx.stroke();

        }

        // Border

        ctx.strokeStyle = "#c6a75e";
        ctx.lineWidth = 6;

        ctx.strokeRect(
            arena.x,
            arena.y,
            arena.width,
            arena.height
        );

    }

    // =========================
    // GAME OVER
    // =========================

    function drawGameOver() {

        if (!gameOver) {
            return;
        }

        ctx.fillStyle =
            "rgba(0,0,0,0.65)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.textAlign = "center";

        ctx.font = "bold 54px Arial";

        ctx.fillStyle =
            winner === "YOU WIN!"
                ? "#ffd54a"
                : "#ff5555";

        ctx.fillText(
            winner,
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.font = "bold 20px Arial";

        ctx.fillStyle = "#ffffff";

        ctx.fillText(
            "Press Restart to fight again",
            canvas.width / 2,
            canvas.height / 2 + 45
        );

    }

    // =========================
    // GAME LOOP
    // =========================

    function loop() {

        update();

        drawArena();

        drawGrayKnight(player);

        drawBlackKnight(enemy);

        drawGameOver();

        animationID =
            requestAnimationFrame(loop);

    }

    loop();

}
// =========================
// SETTINGS
// =========================

const settingsButton = document.getElementById("settingsButton");
const settingsScreen = document.getElementById("settingsScreen");
const lightTheme = document.getElementById("lightTheme");
const darkTheme = document.getElementById("darkTheme");
const backFromSettings = document.getElementById("backFromSettings");


// Open Settings
settingsButton.addEventListener("click", function () {
    homeScreen.classList.remove("active");
    gameScreen.classList.remove("active");

    settingsScreen.classList.add("active");
});


// Light Theme
lightTheme.addEventListener("click", function () {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("gameclassic_theme", "light");
});


// Dark Theme
darkTheme.addEventListener("click", function () {
    document.body.classList.add("dark-mode");
    localStorage.setItem("gameclassic_theme", "dark");
});


// Back
backFromSettings.addEventListener("click", function () {
    settingsScreen.classList.remove("active");
    homeScreen.classList.add("active");
});


// Load saved theme
const savedTheme = localStorage.getItem("gameclassic_theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}
// =========================
// ABOUT
// =========================

const aboutButton = document.getElementById("aboutButton");
const aboutScreen = document.getElementById("aboutScreen");
const backFromAbout = document.getElementById("backFromAbout");


// Open About
aboutButton.addEventListener("click", function () {

    homeScreen.classList.remove("active");
    gameScreen.classList.remove("active");
    settingsScreen.classList.remove("active");

    aboutScreen.classList.add("active");

});


// Back from About
backFromAbout.addEventListener("click", function () {

    aboutScreen.classList.remove("active");
    homeScreen.classList.add("active");

});

// =========================
// GAMECLASSIC LANGUAGE SYSTEM
// =========================

const translations = {

    en: {

        // Menu
        settings: "Settings",
        about: "About",

        // Settings
        language: "Language",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        back: "Back",

        // Home
        chooseGame: "Choose a Game",
        classicGames: "Classic games. Simple fun.",

        // Game screen
        menu: "Menu",
        restart: "Restart",
        score: "Score",
        lives: "Lives",

        // Game messages
        gameOver: "Game Over",
        youWin: "You Win!",
        youLose: "You Lose!",
        computerWins: "Computer Wins!",
        draw: "Draw!",
        crash: "Crash!",
        pairsFound: "You found all pairs!",
        time: "Time",
        dots: "Dots",
        allDotsCollected: "All dots collected!",
        timeUp: "Time's Up!",
        distance: "Distance",
        round: "Round",
        ranOutHearts: "You ran out of hearts!",
        completedRounds: "You completed all 5 rounds!",
        heartsRemaining: "hearts remaining",
        pressSpace: "Press SPACE when the item appears!",
        youLost: "You lost!",
        survivedEnd: "You survived until the end!",
        finalScore: "Final Score",
        reached2048: "You reached 2048!",
        noMoreMoves: "No more moves!",
        defeat: "DEFEAT!",
        pressRestart: "Press Restart to fight again",
        you: "YOU",
        enemy: "ENEMY"
    },

    fa: {

        // Menu
        settings: "تنظیمات",
        about: "درباره",

        // Settings
        language: "زبان",
        theme: "پوسته",
        light: "روشن",
        dark: "تیره",
        back: "بازگشت",

        // Home
        chooseGame: "یک بازی انتخاب کنید",
        classicGames: "بازی‌های کلاسیک. سرگرمی ساده.",

        // Game screen
        menu: "منو",
        restart: "شروع دوباره",
        score: "امتیاز",
        lives: "جان",

        // Game messages
        gameOver: "پایان بازی",
        youWin: "شما برنده شدید!",
        youLose: "شما باختید!",
        computerWins: "کامپیوتر برنده شد!",
        draw: "مساوی!",
        crash: "تصادف!",
        pairsFound: "همه جفت‌ها را پیدا کردید!",
        time: "زمان",
        dots: "نقطه‌ها",
        allDotsCollected: "همه نقطه‌ها جمع شدند!",
        timeUp: "زمان تمام شد!",
        distance: "مسافت",
        round: "مرحله",
        ranOutHearts: "جان‌هایتان تمام شد!",
        completedRounds: "هر ۵ مرحله را کامل کردید!",
        heartsRemaining: "جان باقی‌مانده",
        pressSpace: "وقتی آیتم ظاهر شد، SPACE را بزنید!",
        youLost: "شما باختید!",
        survivedEnd: "تا پایان دوام آوردید!",
        finalScore: "امتیاز نهایی",
        reached2048: "به ۲۰۴۸ رسیدید!",
        noMoreMoves: "حرکت دیگری باقی نمانده!",
        defeat: "شکست!",
        pressRestart: "برای مبارزه دوباره روی شروع دوباره بزنید",
        you: "شما",
        enemy: "دشمن"
    }

};


// =========================
// CURRENT LANGUAGE
// =========================

let currentLanguage =
    localStorage.getItem("gameclassic_language") || "en";


// =========================
// TRANSLATION FUNCTION
// =========================

function t(key) {

    return translations[currentLanguage][key] ||
           translations.en[key] ||
           key;

}


// =========================
// GAME NAMES + DESCRIPTIONS
// =========================

const gameTranslations = {

    snake: {
        name: {
            en: "Snake",
            fa: "مار"
        },
        description: {
            en: "Eat, grow and survive",
            fa: "بخور، رشد کن و زنده بمان"
        }
    },

    snake2: {
        name: {
            en: "Snake 2",
            fa: "مار ۲"
        },
        description: {
            en: "Eat and get faster",
            fa: "بخور و سریع‌تر شو"
        }
    },

    pong: {
        name: {
            en: "Pong",
            fa: "پونگ"
        },
        description: {
            en: "Classic arcade tennis",
            fa: "تنیس کلاسیک آرکید"
        }
    },

    pong2: {
        name: {
            en: "Pong 2",
            fa: "پونگ ۲"
        },
        description: {
            en: "Survive the obstacles. Watch out for the ghost blocks!",
            fa: "از موانع جان سالم به در ببر. مراقب بلوک‌های شبح باش!"
        }
    },

    xo: {
        name: {
            en: "XO",
            fa: "دوز"
        },
        description: {
            en: "Beat your opponent",
            fa: "حریفت را شکست بده"
        }
    },

    breakout: {
        name: {
            en: "Breakout",
            fa: "بریک‌اوت"
        },
        description: {
            en: "Destroy all the bricks",
            fa: "تمام آجرها را نابود کن"
        }
    },

    airhockey: {
        name: {
            en: "Air Hockey",
            fa: "هاکی روی میز"
        },
        description: {
            en: "Beat the computer",
            fa: "کامپیوتر را شکست بده"
        }
    },

    memory: {
        name: {
            en: "Memory",
            fa: "حافظه"
        },
        description: {
            en: "Find all the pairs",
            fa: "تمام جفت‌ها را پیدا کن"
        }
    },

    tetris: {
        name: {
            en: "Tetris",
            fa: "تتریس"
        },
        description: {
            en: "Clear lines and survive",
            fa: "خط‌ها را پاک کن و زنده بمان"
        }
    },

    racing: {
        name: {
            en: "Mini Racing",
            fa: "مسابقه کوچک"
        },
        description: {
            en: "Race, dodge and survive",
            fa: "مسابقه بده، جاخالی بده و زنده بمان"
        }
    },

    dothunter: {
        name: {
            en: "Dot Hunter",
            fa: "شکارچی نقطه"
        },
        description: {
            en: "Eat all dots before time runs out",
            fa: "قبل از تمام شدن زمان، همه نقطه‌ها را بخور"
        }
    },

    duel: {
        name: {
            en: "Duel",
            fa: "دوئل"
        },
        description: {
            en: "Fight the black knight",
            fa: "با شوالیه سیاه مبارزه کن"
        }
    },

    helicopter: {
        name: {
            en: "Helicopter",
            fa: "هلیکوپتر"
        },
        description: {
            en: "Fly, dodge and survive",
            fa: "پرواز کن، جاخالی بده و زنده بمان"
        }
    },

    "2048": {
        name: {
            en: "2048",
            fa: "۲۰۴۸"
        },
        description: {
            en: "Merge numbers and reach 2048",
            fa: "اعداد را ترکیب کن و به ۲۰۴۸ برس"
        }
    },

    coincollector: {
        name: {
            en: "Coin Collector",
            fa: "جمع‌آوری سکه"
        },
        description: {
            en: "Collect coins and avoid bombs",
            fa: "سکه جمع کن و از بمب‌ها دوری کن"
        }
    },

    discthief: {
        name: {
            en: "Disc Thief",
            fa: "دزد دیسک"
        },
        description: {
            en: "React fast and steal the discs",
            fa: "سریع واکنش نشان بده و دیسک‌ها را بدزد"
        }
    },

    minesweeper: {
        name: {
            en: "Minesweeper",
            fa: "مین‌یاب"
        },
        description: {
            en: "Find the safe tiles",
            fa: "خانه‌های امن را پیدا کن"
        }
    },

    shooter: {
        name: {
            en: "Space Shooter",
            fa: "شوتر فضایی"
        },
        description: {
            en: "Destroy the enemies",
            fa: "دشمنان را نابود کن"
        }
    }

};


// =========================
// APPLY LANGUAGE
// =========================

function applyLanguage() {

    // HTML direction

    document.documentElement.lang = currentLanguage;

    if (currentLanguage === "fa") {
        document.documentElement.dir = "rtl";
        document.body.classList.add("persian-mode");
    } else {
        document.documentElement.dir = "ltr";
        document.body.classList.remove("persian-mode");
    }


    // =========================
    // SITE MENU
    // =========================

    const settingsButton =
        document.getElementById("settingsButton");

    const aboutButton =
        document.getElementById("aboutButton");

    if (settingsButton) {
        settingsButton.textContent =
            "⚙️ " + t("settings");
    }

    if (aboutButton) {
        aboutButton.textContent =
            "ℹ️ " + t("about");
    }


    // =========================
    // SETTINGS
    // =========================

    const settingsTitle =
        document.querySelector("#settingsScreen .settings-box h2");

    if (settingsTitle) {
        settingsTitle.textContent =
            "⚙️ " + t("settings");
    }


    const languageTitle =
        document.querySelector(
            "#settingsScreen .settings-box h3:nth-of-type(1)"
        );

    if (languageTitle) {
        languageTitle.textContent =
            "🌐 " + t("language");
    }


    const themeTitle =
        document.querySelector(
            "#settingsScreen .settings-box h3:nth-of-type(2)"
        );

    if (themeTitle) {
        themeTitle.textContent =
            "🌓 " + t("theme");
    }


    const lightTheme =
        document.getElementById("lightTheme");

    const darkTheme =
        document.getElementById("darkTheme");

    const englishLanguage =
        document.getElementById("englishLanguage");

    const persianLanguage =
        document.getElementById("persianLanguage");

    const backFromSettings =
        document.getElementById("backFromSettings");


    if (lightTheme) {
        lightTheme.textContent =
            "☀️ " + t("light");
    }

    if (darkTheme) {
        darkTheme.textContent =
            "🌙 " + t("dark");
    }

    if (englishLanguage) {
        englishLanguage.textContent =
            "🇺🇸 English";
    }

    if (persianLanguage) {
        persianLanguage.textContent =
            "🇮🇷 فارسی";
    }

    if (backFromSettings) {
        backFromSettings.textContent =
            "← " + t("back");
    }


    // =========================
    // HOME
    // =========================

    const heroText =
        document.querySelector("#homeScreen .hero p");

    if (heroText) {
        heroText.textContent =
            t("classicGames");
    }


    const chooseGame =
        document.querySelector("#homeScreen .home-content h2");

    if (chooseGame) {
        chooseGame.textContent =
            t("chooseGame");
    }


    // =========================
    // GAME CARDS
    // =========================

    document.querySelectorAll(".game-card").forEach(function(card) {

        const gameID = card.dataset.game;

        const gameData =
            gameTranslations[gameID];

        if (!gameData) {
            return;
        }


        const nameElement =
            card.querySelector("strong");

        const descriptionElement =
            card.querySelector("small");


        if (nameElement) {

            nameElement.textContent =
                gameData.name[currentLanguage];

        }


        if (descriptionElement) {

            descriptionElement.textContent =
                gameData.description[currentLanguage];

        }

    });


    // =========================
    // FOOTER
    // =========================

    const footerText =
        document.querySelector("#homeScreen footer p");

    if (footerText) {

        if (currentLanguage === "fa") {

            footerText.textContent =
                "© 2026 گیم کلاسیک";

        } else {

            footerText.textContent =
                "© 2026 GameClassic";

        }

    }


    // =========================
    // ABOUT
    // =========================

    applyAboutLanguage();


    // =========================
    // GAME SCREEN
    // =========================

    applyGameScreenLanguage();

}


// =========================
// ABOUT TRANSLATION
// =========================

function applyAboutLanguage() {

    const aboutBox =
        document.querySelector("#aboutScreen .about-box");

    if (!aboutBox) {
        return;
    }


    if (currentLanguage === "fa") {

        aboutBox.innerHTML = `
            <h2>ℹ️ درباره گیم کلاسیک</h2>

            <p>
                سلام و به گیم کلاسیک خوش آمدید! 🎮
            </p>

            <p>
                ما گیم کلاسیک را به عنوان مجموعه‌ای از بازی‌های کلاسیک و سرگرم‌کننده
                برای شما ساخته‌ایم. هدف ما این است که بازی‌های ساده، سرگرم‌کننده و
                جذابی را فراهم کنیم تا هر زمان که خواستید استراحت کنید و اوقات خوبی
                داشته باشید.
            </p>

            <p>
                لطفاً توجه داشته باشید که این <strong>نسخه دمو</strong>ی گیم کلاسیک است
                و هنوز نسخه کامل نیست. در نسخه کامل قصد داریم امکانات بسیار بیشتری
                اضافه کنیم؛ از جمله <strong>بازی‌های بیشتر، چندنفره آنلاین،
                تنظیمات گسترده‌تر، سیستم رتبه‌بندی و رکوردها، مسابقات با جوایز نقدی</strong>
                و بسیاری امکانات هیجان‌انگیز دیگر.
            </p>

            <p>
                گیم کلاسیک هنوز در حال توسعه است و برای بزرگ‌تر و بهتر شدن آن
                راه زیادی در پیش داریم. امیدواریم از بازی‌های موجود در این نسخه دمو
                لذت ببرید و تجربه خوبی از گیم کلاسیک داشته باشید. ❤️
            </p>

            <p>
                ❤️ <strong>از گیم کلاسیک حمایت کنید:</strong>
                لطفاً با به اشتراک گذاشتن گیم کلاسیک با دوستانتان و معرفی سایت به
                آن‌ها از ما حمایت کنید. حمایت شما به ما کمک می‌کند تا به توسعه
                گیم کلاسیک و ساخت بازی‌ها و امکانات بیشتر ادامه دهیم. 🚀
            </p>

            <p>
                🖥️ <strong>پلتفرم:</strong>
                گیم کلاسیک در حال حاضر فقط برای کامپیوتر در دسترس است.
                ممکن است در آینده نسخه موبایل آن را نیز توسعه دهیم تا بازیکنان
                موبایل هم بتوانند از گیم کلاسیک لذت ببرند.
            </p>

            <p>
                <strong>
                    از اینکه گیم کلاسیک را انتخاب کردید متشکریم.
                    از بازی‌ها لذت ببرید و خوش بگذرانید! 🎮❤️
                </strong>
            </p>

            <p>
                ⚠️ <strong>توجه:</strong>
                گیم کلاسیک هنوز در حال توسعه است، بنابراین نسخه دمو ممکن است
                دارای باگ یا مشکلات غیرمنتظره باشد. از درک شما متشکریم و امیدواریم
                از تجربه بازی لذت ببرید.
            </p>

            <button id="backFromAbout">← بازگشت</button>
        `;

    } else {

        aboutBox.innerHTML = `
            <h2>ℹ️ About GameClassic</h2>

            <p>
                Hello and welcome to GameClassic! 🎮
            </p>

            <p>
                We’ve created GameClassic as a collection of classic and entertaining
                games for you to enjoy. Our goal is to provide simple, fun, and engaging
                games that you can play whenever you want to relax and have a good time.
            </p>

            <p>
                Please keep in mind that this is the <strong>Demo version</strong> of
                GameClassic, so it is not the complete version yet. In the full version,
                we plan to add many more features, including <strong>more games,
                online multiplayer, expanded settings, a ranking and records system,
                tournaments with cash prizes,</strong> and many other exciting features.
            </p>

            <p>
                GameClassic is still under development, and we have a long way to go
                to make it bigger and better. We hope you enjoy the games available
                in this demo and have a great experience playing GameClassic. ❤️
            </p>

            <p>
                ❤️ <strong>Support GameClassic:</strong>
                Please support us by sharing GameClassic with your friends and
                introducing them to our website. Your support helps us continue
                developing GameClassic and creating more games and features. 🚀
            </p>

            <p>
                🖥️ <strong>Platform:</strong>
                GameClassic is currently available for PC only. We may port or
                develop a mobile version in the future, so mobile players may be
                able to enjoy GameClassic as well.
            </p>

            <p>
                <strong>
                    Thank you for choosing GameClassic. Have fun and enjoy the games!
                    🎮❤️
                </strong>
            </p>

            <p>
                ⚠️ <strong>Please note:</strong>
                GameClassic is still under development, so the Demo version may
                contain bugs or unexpected issues. We appreciate your understanding
                and hope you enjoy the experience.
            </p>

            <button id="backFromAbout">← Back</button>
        `;
    }


    // اتصال دوباره دکمه Back
    const newBackFromAbout =
        document.getElementById("backFromAbout");

    if (newBackFromAbout) {

        newBackFromAbout.addEventListener("click", function () {

            aboutScreen.classList.remove("active");
            homeScreen.classList.add("active");

        });

    }

}


// =========================
// GAME SCREEN TRANSLATION
// =========================

function applyGameScreenLanguage() {

    const backButton =
        document.getElementById("backButton");

    const restartButton =
        document.getElementById("restartButton");

    if (backButton) {

        backButton.textContent =
            "← " + t("menu");

    }

    if (restartButton) {

        restartButton.textContent =
            "↻ " + t("restart");

    }


    // Score

    const scoreText =
        document.getElementById("scoreText");

    if (scoreText && currentScore !== undefined) {

        const score =
            currentScore || 0;

        scoreText.textContent =
            t("score") + ": " + score;

    }

}


// =========================
// LANGUAGE BUTTONS
// =========================

const englishLanguage =
    document.getElementById("englishLanguage");

const persianLanguage =
    document.getElementById("persianLanguage");


if (englishLanguage) {

    englishLanguage.addEventListener("click", function() {

        currentLanguage = "en";

        localStorage.setItem(
            "gameclassic_language",
            "en"
        );

        applyLanguage();

    });

}


if (persianLanguage) {

    persianLanguage.addEventListener("click", function() {

        currentLanguage = "fa";

        localStorage.setItem(
            "gameclassic_language",
            "fa"
        );

        applyLanguage();

    });

}


// =========================
// LOAD SAVED LANGUAGE
// =========================

const savedLanguage =
    localStorage.getItem("gameclassic_language");

if (savedLanguage === "fa") {

    currentLanguage = "fa";

} else {

    currentLanguage = "en";

}


// =========================
// START LANGUAGE SYSTEM
// =========================

applyLanguage();