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
            const obstacleRect = obstacle.element
