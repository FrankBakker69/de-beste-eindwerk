document.addEventListener('DOMContentLoaded', () => {
    const ball = document.querySelector('.ball');
    const goal = document.querySelector('.goal');
    const gameContainer = document.querySelector('.game-container');

    let ballX = 130;
    const ballY = 280;

    function updateBallPosition() {
        ball.style.left = `${ballX}px`;
    }

    function checkCollision() {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();

        return !(
            ballRect.right < goalRect.left ||
            ballRect.left > goalRect.right ||
            ballRect.bottom < goalRect.top ||
            ballRect.top > goalRect.bottom
        );
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft' && ballX > 10) {
            ballX -= 10;
            updateBallPosition();
        } else if (event.key === 'ArrowRight' && ballX < 270) {
            ballX += 10;
            updateBallPosition();
        }

        if (checkCollision()) {
            alert('Geweldig! Je hebt het doel bereikt!');
            ballX = 130;
            updateBallPosition();
        }
    }

    document.addEventListener('keydown', handleKeyDown);
});
