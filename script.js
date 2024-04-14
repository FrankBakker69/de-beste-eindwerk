document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');

    // Huidige positie van het doel
    let goalLeft = parseInt(getComputedStyle(goal).left);
    let goalTop = parseInt(getComputedStyle(goal).top);

    // Beweging van het doel
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        switch (key) {
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

        // Zet de nieuwe positie van het doel (voorkom dat het doel buiten het spelcontainer gaat)
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
