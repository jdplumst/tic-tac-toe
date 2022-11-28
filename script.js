const gameBoardCells = document.querySelectorAll('td');

// gameBoard module
const gameBoard = (() => {
    let _board = ['X','X','X','O','O','O','X','O','X'];

    function updateBoard() {
        for (let i = 0; i < _board.length; i++) {
            gameBoardCells[i].textContent = _board[i];
            gameBoardCells[i].style.textAlign = 'center';
        }
    };

    // gameBoardCells.forEach(cell => {
    //     cell.addEventListener('click', () => {
    //         let index = cell.getAttribute('id');
    //         _board[index] = ''; // use gameState to check player turn
    //         if (cell.textContent !== '') {
    //             console.log("can't play there!");
    //         }
    //     })
    // })

    return {
        updateBoard
    };
})();

// gameState module
const gameState = (() => {
    let _turnNumber = 0;

    function getTurnNumber() {
        return _turnNumber;
    };

    return {getTurnNumber};
})();

// Player factory
const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
};