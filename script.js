document.addEventListener('DOMContentLoaded', function() {
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const gameContainer = document.getElementById('game-container');

    let ballX = 20;
    let ballY = 190;
    let ballSpeed = 5;

    function updateBallPosition() {
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        // Check collision with goal
        if (isColliding(ball, goal)) {
            console.log("Goal! Je hebt gewonnen.");
            ball.style.backgroundColor = 'green';
        }
    }

    function isColliding(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();

        return (
            ballRect.right >= goalRect.left &&
            ballRect.left <= goalRect.right &&
            ballRect.bottom >= goalRect.top &&
            ballRect.top <= goalRect.bottom
        );
    }

    document.addEventListener('keydown', function(event) {
        const key = event.key;

        switch(key) {
            case 'ArrowLeft':
                ballX = Math.max(ballX - ballSpeed, 0);
                break;
            case 'ArrowRight':
                ballX = Math.min(ballX + ballSpeed, gameContainer.clientWidth - ball.offsetWidth);
                break;
            case 'ArrowUp':
                ballY = Math.max(ballY - ballSpeed, 0);
                break;
            case 'ArrowDown':
                ballY = Math.min(ballY + ballSpeed, gameContainer.clientHeight - ball.offsetHeight);
                break;
        }

        updateBallPosition();
    });
});
