const Board = (() => {

    const cellCount = 9;
    const board = [];

    for( let i = 0 ; i < cellCount ; i++){
        board.push(Cell());
    }

   const getBoard = () => board;



    return {
        getBoard
    };

})();

function Cell() {

    let value = 0;

    const addMark = (token) => {
        value = token;
    }

    const getValue = () => value;

    return { 
        addMark, 
        getValue
    };
};

function Players(name, token){
    
    const getName = () => name;
    const getToken = () => token;

    return{getName, getToken};
};

const display = (() => {

    const displayBoard = (board) => {
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
        displayBoard
    };

})();

const controller = (() => {

    display.displayBoard(Board.getBoard());

    return {
        
    };

})();