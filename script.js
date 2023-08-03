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

    const addToken = (token) => {
        value = token;
    }

    const getValue = () => value;

    return { 
        addToken, 
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
                let displayValue = cell.getValue();
                if(displayValue === 1){
                    displayValue = "X";
                }else if(displayValue === 2){
                    displayValue = "O";
                }else{
                    displayValue = " ";
                }
                mark.textContent = displayValue;
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