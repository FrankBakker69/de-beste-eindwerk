document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const obstacle1 = document.querySelector('.obstacle1');
    const obstacle2 = document.querySelector('.obstacle2');
    const gameContainer = document.getElementById('game-container');

    // Huidige positie van het balletje
    let ballLeft = parseInt(getComputedStyle(ball).left);
    let ballTop = parseInt(getComputedStyle(ball).top);

    // Functie om het balletje te bewegen
    function moveBall(direction) {
        let newBallLeft = ballLeft;
        let newBallTop = ballTop;

        switch (direction) {
            case 'ArrowUp':
                newBallTop -= 10; // Verplaats het balletje omhoog
                break;
            case 'ArrowDown':
                newBallTop += 10; // Verplaats het balletje omlaag
                break;
            case 'ArrowLeft':
                newBallLeft -= 10; // Verplaats het balletje naar links
                break;
            case 'ArrowRight':
                newBallLeft += 10; // Verplaats het balletje naar rechts
                break;
        }

        // Controleer of het nieuwe positie van het balletje een obstakel raakt
        if (!isObstacleCollision(newBallLeft, newBallTop)) {
            // Update de positie van het balletje
            ballLeft = newBallLeft;
            ballTop = newBallTop;

            // Zet de nieuwe positie van het balletje (voorkom dat het buiten het spelcontainer gaat)
            if (ballLeft < 0) {
                ballLeft = 0;
            }
            if (ballLeft > gameContainer.clientWidth - ball.clientWidth) {
                ballLeft = gameContainer.clientWidth - ball.clientWidth;
            }
            if (ballTop < 0) {
                ballTop = 0;
            }
            if (ballTop > gameContainer.clientHeight - ball.clientHeight) {
                ballTop = gameContainer.clientHeight - ball.clientHeight;
            }

            ball.style.left = ballLeft + 'px';
            ball.style.top = ballTop + 'px';

            // Controleer winvoorwaarde
            if (checkCollision(ball, goal)) {
                alert('Gefeliciteerd! Je hebt het doel bereikt!');
            }
        }
    }

    // Functie om te controleren of het balletje een obstakel raakt
    function isObstacleCollision(x, y) {
        const obstacles = [obstacle1, obstacle2];

        for (const obstacle of obstacles) {
            const obstacleRect = obstacle.getBoundingClientRect();

            if (x >= obstacleRect.left && x < obstacleRect.right &&
                y >= obstacleRect.top && y < obstacleRect.bottom) {
                return true; // Botst met het obstakel
            }
        }
        return false; // Geen obstakelbotsing
    }

    // Functie om de obstakels periodiek te laten bewegen
    function moveObstacles() {
        // Beweeg obstacle1 van links naar rechts
        let obstacle1Left = parseInt(getComputedStyle(obstacle1).left);
        obstacle1Left += 2;
        if (obstacle1Left > gameContainer.clientWidth) {
            obstacle1Left = -50; // Reset naar de linkerzijde van het spelcontainer
        }
        obstacle1.style.left = obstacle1Left + 'px';

        // Beweeg obstacle2 van rechts naar links
        let obstacle2Left = parseInt(getComputedStyle(obstacle2).left);
        obstacle2Left -= 3;
        if (obstacle2Left < -50) {
            obstacle2Left = gameContainer.clientWidth; // Reset naar de rechterzijde van het spelcontainer
        }
        obstacle2.style.left = obstacle2Left + 'px';

        // Controleer of het balletje een obstakel raakt na het bewegen van de obstakels
        if (isObstacleCollision(ballLeft, ballTop)) {
            // Reset de positie van het balletje als het een obstakel raakt
            ball.style.left = '50px';
            ball.style.top = '50px';
            ballLeft = 50;
            ballTop = 50;
        }

        // Herhaal de functie periodiek met requestAnimationFrame
        requestAnimationFrame(moveObstacles);
    }

    // Start het bewegen van de obstakels
    moveObstacles();

    // Event listener voor het bewegen van het balletje
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        moveBall(key);
    });

    // Controleer of de bal het doel bereikt
    function checkCollision(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
