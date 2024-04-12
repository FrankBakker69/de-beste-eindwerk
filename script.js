document.addEventListener('DOMContentLoaded', function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');

    let ballX = 20;
    let ballY = 190;
    let ballSpeedX = 5;

    function updateBall() {
        ballX += ballSpeedX;
        ball.style.left = ballX + 'px';

        // Check collision with goal
        if (ballX + ball.offsetWidth >= goal.offsetLeft && 
            ballY + ball.offsetHeight >= goal.offsetTop && 
            ballY <= goal.offsetTop + goal.offsetHeight) {
            console.log("Goal! Je hebt gewonnen.");
            ball.style.backgroundColor = 'green';
        }

        // Check collision with wall
        if (ballX + ball.offsetWidth >= 600 || ballX <= 0) {
            ballSpeedX *= -1;
        }
    }

    function gameLoop() {
        updateBall();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
