document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');

    // Huidige positie van het balletje
    let ballLeft = parseInt(getComputedStyle(ball).left);
    let ballTop = parseInt(getComputedStyle(ball).top);

    // Array met obstakels
    const obstacles = [
        { element: document.getElementById('obstacle1'), speed: 2, startX: 50, startY: 100, direction: 'right' },
        { element: document.getElementById('obstacle2'), speed: 3, startX: 350, startY: 300, direction: 'left' },
        { element: document.getElementById('obstacle3'), speed: 1.5, startX: 100, startY: 400, direction: 'right' }
    ];

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
        for (const obstacle of obstacles) {
            const obstacleRect = obstacle.element.getBoundingClientRect();

            if (x >= obstacleRect.left && x < obstacleRect.right &&
                y >= obstacleRect.top && y < obstacleRect.bottom) {
                return true; // Botst met het obstakel
            }
        }
        return false; // Geen obstakelbotsing
    }

    // Functie om de obstakels periodiek te laten bewegen
    function moveObstacles() {
        obstacles.forEach(obstacle => {
            let obstacleLeft = parseInt(getComputedStyle(obstacle.element).left);

            // Beweeg het obstakel naar rechts
            if (obstacle.direction === 'right') {
                obstacleLeft += obstacle.speed;
                if (obstacleLeft > gameContainer.clientWidth) {
                    obstacleLeft = -50; // Reset naar de linkerzijde van het spelcontainer
                }
            }
            // Beweeg het obstakel naar links
            else if (obstacle.direction === 'left') {
                obstacleLeft -= obstacle.speed;
                if (obstacleLeft < -50) {
                    obstacleLeft = gameContainer.clientWidth; // Reset naar de rechterzijde van het spelcontainer
                }
            }

            obstacle.element.style.left = obstacleLeft + 'px';

            // Controleer of het balletje een obstakel raakt na het bewegen van de obstakels
            if (isObstacleCollision(ballLeft, ballTop)) {
                // Reset de positie van het balletje als het een obstakel raakt
                ball.style.left = '50px';
                ball.style.top = '50px';
                ballLeft = 50;
                ballTop = 50;
            }
        });

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

        return !(ballRect.right < goalRect.left ||
                 ballRect.left > goalRect.right ||
                 ballRect.bottom < goalRect.top ||
                 ballRect.top > goalRect.bottom);
    }
});
