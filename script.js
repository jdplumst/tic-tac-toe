const gameBoardCells = document.querySelectorAll('td');
const winnerMsg = document.querySelector('.winner');
const modalStart = document.querySelector('.modal-start');
const modalEnd = document.querySelector('.modal-end');
const startGame = document.querySelector('.start-btn');
const playAgain = document.querySelector('.end-btn');
const singlePlayer = document.querySelector('#single-player');
const multiPlayer = document.querySelector('#multi-player');
const playerOne = document.querySelector('#p1-name');
const playerTwo = document.querySelector('#p2-name');

// gameBoard module
const gameBoard = (() => {
    let _board = ['','','','','','','','',''];

    function getBoard() {
        return _board;
    };

    // Checks the turn number and selected board cell to update the board
    function updateBoard() {
        let index = gameState.getIndex();
        if (index === -1) { // Prevent board from updating before game start
            _board = ['','','','','','','','',''];
            return;
        } 
        let turn = gameState.getTurnNumber();
        if (turn % 2 === 0) { // Player 1's turn
            _board[index] = gameState.getPlayerOnePiece();
        } else { // Player 2's turn
            _board[index] = gameState.getPlayerTwoPiece();
        }
    };

    // Displays the game board on the screen
    function displayBoard() {
        for (let i = 0; i < _board.length; i++) {
            gameBoardCells[i].textContent = _board[i];
            gameBoardCells[i].style.textAlign = 'center';
        }
    };

    return {
        getBoard, 
        updateBoard, 
        displayBoard
    };
})();

// Player factory
const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
};

// gameState module
const gameState = (() => {
    let _turnNumber = 0;
    let _players = [];
    let _index = -1; // Game Board index

    function _nextTurn() {
        _turnNumber++;
    };

    function getTurnNumber() {
        return _turnNumber;
    };

    function getPlayerOnePiece() {
        return _players[0].getPiece();
    };

    function getPlayerTwoPiece() {
        return _players[1].getPiece();
    };

    function getIndex() {
        return _index;
    };

    // Checks for winner of game
    // There are 8 winner patterns for each player plus draw pattern
    // Winner patterns: [012, 345, 678, 036, 147, 258, 048, 246]
    function checkWinner() {
        let board = gameBoard.getBoard();
        if (board[0] === board[1] && board[1] === board[2]) {
            if (board[0] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[0] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[3] === board[4] && board[4] === board[5]) {
            if (board[3] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[3] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[6] === board[7] && board[7] === board[8]) {
            if (board[6] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[6] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[0] === board[3] && board[3] === board[6]) {
            if (board[0] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[0] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[1] === board[4] && board[4] === board[7]) {
            if (board[1] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[1] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[2] === board[5] && board[5] === board[8]) {
            if (board[2] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[2] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[0] === board[4] && board[4] === board[8]) {
            if (board[0] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[0] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[2] === board[4] && board[4] === board[6]) {
            if (board[2] === 'X') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[2] === 'O') {
                modalEnd.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (_turnNumber === 9) {
            modalEnd.style.display = 'block';
            winnerMsg.textContent = "It's a draw!";
            return;
        }
    };

    // Updates game board accordingly when a player clicks on the board
    gameBoardCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent !== '') {
                return;
            } else {
                _index = cell.getAttribute('id');
                gameBoard.updateBoard();
                gameBoard.displayBoard();
                _nextTurn();
                checkWinner();
            }
        })
    });

    // Start button
    startGame.addEventListener('click', (event) => {
        let playerOneName = playerOne.value;
        let playerTwoName = playerTwo.value;
        if (playerOneName === '' || 
        (playerTwoName === '' && playerTwo.disabled === false)) {
            return;
        }
        _players[0] = Player(playerOneName, 'X');
        _players[1] = Player(playerTwoName, 'O');
        modalStart.style.display = 'none';
        event.preventDefault(); // Prevent form from submitting
    });

    // Play Again button
    playAgain.addEventListener('click', () => {
        modalEnd.style.display = 'none';
        _index = -1;
        gameBoard.updateBoard(); // Resets board with _index = -1
        gameBoard.displayBoard();
        _turnNumber = 0;
    });

    // Disable Player Two Name input
    singlePlayer.addEventListener('click', () => {
        playerTwo.disabled = true;
        playerTwo.required = false;
    });

    // Enable Player Two Name input
    multiPlayer.addEventListener('click', () => {
        playerTwo.disabled = false;
        playerTwo.required = true;
    });

    return {
        getTurnNumber, 
        getPlayerOnePiece, 
        getPlayerTwoPiece, 
        getIndex, 
        checkWinner
    };
})();