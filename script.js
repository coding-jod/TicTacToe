const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart-button');
let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;

    if (cell.dataset.cell !== '' || gameOver) {
        return;
    }

    cell.textContent = currentPlayer;
    cell.dataset.cell = currentPlayer;
    
    if (checkWin(currentPlayer)) {
        gameOver = true;
        highlightWinningCombo(currentPlayer);
        displayMessage(`${currentPlayer} wins!`);
        return;
    }
    
    if (checkDraw()) {
        gameOver = true;
        displayMessage("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]           // Diagonals
    ];

    return winningCombos.some(combo => {
        return combo.every(index => cells[index].dataset.cell === player);
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.dataset.cell !== '');
}

function highlightWinningCombo(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]           // Diagonals
    ];

    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (cells[a].dataset.cell === player && cells[b].dataset.cell === player && cells[c].dataset.cell === player) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
        }
    });
}

function displayMessage(msg) {
    const messageBox = document.querySelector('.message');
    const messageText = messageBox.querySelector('p');
    const restartButton = messageBox.querySelector('.restart-button');

    messageText.textContent = msg;
    messageBox.style.display = 'block';
    
    restartButton.addEventListener('click', () => {
        messageBox.style.display = 'none';
        restartGame();
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.dataset.cell = '';
        cell.classList.remove('winning-cell');
    });
    currentPlayer = 'X';
    gameOver = false;
}
