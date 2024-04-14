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

    // Functie om het balletje te bewegen
    function moveBall(direction) {
        switch (direction) {
            case 'ArrowUp':
                ballTop -= 10; // Verplaats het balletje omhoog
                break;
            case 'ArrowDown':
                ballTop += 10; // Verplaats het balletje omlaag
                break;
            case 'ArrowLeft':
                ballLeft -= 10; // Verplaats het balletje naar links
                break;
            case 'ArrowRight':
                ballLeft += 10; // Verplaats het balletje naar rechts
                break;
        }

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

    // Functie om het doel te bewegen
    function moveGoal(direction) {
        switch (direction) {
            case 'w':
            case 'W':
                goalTop -= 10; // Verplaats het doel omhoog
                break;
            case 's':
            case 'S':
                goalTop += 10; // Verplaats het doel omlaag
                break;
            case 'a':
            case 'A':
                goalLeft -= 10; // Verplaats het doel naar links
                break;
            case 'd':
            case 'D':
                goalLeft += 10; // Verplaats het doel naar rechts
                break;
        }

        // Zet de nieuwe positie van het doel (voorkom dat het buiten het spelcontainer gaat)
        if (goalLeft < 0) {
            goalLeft = 0;
        }
        if (goalLeft > gameContainer.clientWidth - goal.clientWidth) {
            goalLeft = gameContainer.clientWidth - goal.clientWidth;
        }
        if (goalTop < 0) {
            goalTop = 0;
        }
        if (goalTop > gameContainer.clientHeight - goal.clientHeight) {
            goalTop = gameContainer.clientHeight - goal.clientHeight;
        }

        goal.style.left = goalLeft + 'px';
        goal.style.top = goalTop + 'px';

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('Gefeliciteerd! Je hebt het doel bereikt!');
        }
    }

    // Event listener voor het bewegen van het balletje
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        moveBall(key);
    });

    // Event listener voor het bewegen van het doel
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        moveGoal(key);
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
