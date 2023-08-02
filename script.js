const GameBoard = (() => {

    const rows = 3;
    const columns = 3;
    const board = [];

    for( let i = 0 ; i < rows ; i++){
        board[i] = [];

        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

   const getBoard = () => board;

   const displayBoard = () => {
        const mainBoard = document.querySelector('main');

            board.forEach(cells => {

                cells.forEach(cell => {
                    
                
                let grid = document.createElement('div');
                grid.className = "cell";

                let mark = document.createElement('p');
                let status = cell.getValue();
                mark.textContent = status;
                grid.appendChild(mark);

                mainBoard.appendChild(grid);
            });
        });
   };

    return {
        getBoard,
        displayBoard
    };

})();

function Cell() {

    let value = "0";

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { 
        addMark, 
        getValue
    };
};

GameBoard.displayBoard();