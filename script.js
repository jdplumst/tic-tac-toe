const gameBoardCells = document.querySelectorAll('td');
const winnerMsg = document.querySelector('.winner');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const playAgain = document.querySelector('.modal-btn button');

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
    let _players = [Player('Jimmy', 'X'), Player('Bob', 'O')];
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
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[0] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[3] === board[4] && board[4] === board[5]) {
            if (board[3] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[3] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[6] === board[7] && board[7] === board[8]) {
            if (board[6] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[6] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[0] === board[3] && board[3] === board[6]) {
            if (board[0] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[0] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[1] === board[4] && board[4] === board[7]) {
            if (board[1] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[1] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[2] === board[5] && board[5] === board[8]) {
            if (board[2] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[2] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[0] === board[4] && board[4] === board[8]) {
            if (board[0] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[0] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (board[2] === board[4] && board[4] === board[6]) {
            if (board[2] === 'X') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[0].getName() + ' wins!';
                return;
            } else if (board[2] === 'O') {
                modal.style.display = 'block';
                winnerMsg.textContent = _players[1].getName() + ' wins!';
                return;
            }
        } 
        if (_turnNumber === 9) {
            modal.style.display = 'block';
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

    playAgain.addEventListener('click', () => {
        modal.style.display = 'none';
        _index = -1;
        gameBoard.updateBoard(); // Resets board with _index = -1
        gameBoard.displayBoard();
        _turnNumber = 0;
    });

    return {
        getTurnNumber, 
        getPlayerOnePiece, 
        getPlayerTwoPiece, 
        getIndex, 
        checkWinner
    };
})();