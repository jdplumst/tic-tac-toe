const gameBoardCells = document.querySelectorAll('td');

// gameBoard module
let gameBoard = (() => {
    let _board = ['X','X','X','O','O','O','X','O','X'];

    function updateBoard() {
        for (let i = 0; i < _board.length; i++) {
            gameBoardCells[i].textContent = _board[i];
            gameBoardCells[i].style.textAlign = 'center';
        }
    }

    // gameBoardCells.forEach(cell => {
    //     cell.addEventListener('click', () => {
    //         let index = cell.getAttribute('id');
    //         _board[index] = '';
    //         if (cell.textContent !== '') {
    //             console.log("can't play there!");
    //         }
    //     })
    // })

    return {
        updateBoard
    };
})();