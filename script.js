document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');

    // Huidige positie van het balletje
    let ballLeft = parseInt(getComputedStyle(ball).left);
    let ballTop = parseInt(getComputedStyle(ball).top);

    // Huidige positie van het doel
    let goalLeft = parseInt(getComputedStyle(goal).left);
    let goalTop = parseInt(getComputedStyle(goal).top);

    // Array van obstakelposities [left, top]
    const obstacles = [
        [200, 200], // Voorbeeld obstakel op positie (200px, 200px)
        [300, 350]  // Voorbeeld obstakel op positie (300px, 350px)
        // Voeg meer obstakels toe zoals gewenst
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
            const obstacleLeft = obstacle[0];
            const obstacleTop = obstacle[1];
            const obstacleSize = 50; // Afmetingen van het obstakel (bijvoorbeeld 50x50)

            if (x >= obstacleLeft && x < obstacleLeft + obstacleSize &&
                y >= obstacleTop && y < obstacleTop + obstacleSize) {
                return true; // Botst met het obstakel
            }
        }
        return false; // Geen obstakelbotsing
    }

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
