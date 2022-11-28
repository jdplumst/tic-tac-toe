const gameBoardCells = document.querySelectorAll('td');

// gameBoard module
const gameBoard = (() => {
    let _board = ['','','','','','','','',''];

    // Checks the turn number and selected board cell to update the board
    function updateBoard() {
        let index = gameState.getIndex();
        if (index === -1) return; // Prevent board from updating before game start
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

    return {displayBoard, updateBoard};
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
    let _players = [Player('jimmy', 'X'), Player('bob', 'O')];
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
            }
        })
    });

    return {getTurnNumber, getPlayerOnePiece, getPlayerTwoPiece, getIndex};
})();