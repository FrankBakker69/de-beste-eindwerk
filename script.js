document.addEventListener('DOMContentLoaded', () => {
    const ball = document.querySelector('.ball');
    const goal = document.querySelector('.goal');
    const gameContainer = document.querySelector('.game-container');

    let ballX = 130;
    let ballY = 280;

    function updateBallPosition() {
        ball.style.left = `${ballX}px`;
        ball.style.bottom = `${ballY}px`; // Update de verticale positie
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
        const speed = 10; // Snelheid van beweging

        if (event.key === 'ArrowLeft' && ballX > 10) {
            ballX -= speed;
            updateBallPosition();
        } else if (event.key === 'ArrowRight' && ballX < 270) {
            ballX += speed;
            updateBallPosition();
        } else if (event.key === 'ArrowUp' && ballY < 270) {
            ballY += speed; // Let op: omhoog is positieve Y-richting
            updateBallPosition();
        } else if (event.key === 'ArrowDown' && ballY > 10) {
            ballY -= speed; // Omlaag is negatieve Y-richting
            updateBallPosition();
        }

        if (checkCollision()) {
            alert('Geweldig! Je hebt het doel bereikt!');
            ballX = 130;
            ballY = 280;
            updateBallPosition();
        }
    }

    document.addEventListener('keydown', handleKeyDown);
});
