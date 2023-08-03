const GameBoard = (() => {

    const cellCount = 9;
    const board = [];

    for( let i = 0 ; i < cellCount ; i++){
        board.push(Cell());
    }

   const getBoard = () => board;

   const displayBoard = () => {
        const mainBoard = document.querySelector('main');

            board.forEach(cell => {

                let grid = document.createElement('div');
                grid.className = "cell";

                let mark = document.createElement('p');
                let status = cell.getValue();
                mark.textContent = status;
                grid.appendChild(mark);

                mainBoard.appendChild(grid);
            });
   };

    return {
        getBoard,
        displayBoard
    };

})();

function Cell() {

    let value = 0;

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { 
        addMark, 
        getValue
    };
};

const gameController = (() => {

    const playerOne = 1;
    const playerTwo = 2;

    

})();

GameBoard.displayBoard();
