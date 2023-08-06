const Cell = () => {

    let value = 0;

    const changeValue = (token) => {
        value = token;
    }

    const getValue = () => value;

    return {
        changeValue,
        getValue
    };
};

const GameBoard = (() => {

    const cellNumber = 9;
    const board = [];

    for (let index = 0; index < cellNumber; index++) {
        board.push(Cell());
    }

    const getBoard = () => board;

    const playerMove = (index, player) => {
        if(board[index].getValue() === 0){
            board[index].changeValue(player);
            return true;
        }else{
            console.log("Grid already Taken");
            return false;
        }
        
    };

    const printBoard = () => {
        let boardValues = [];
        board.forEach(cell => {
            boardValues.push(cell.getValue());
        });
        return boardValues;
    };

    const resetBoard = () => {
        board.forEach(cell => {
            cell.changeValue(0);
        });
    };

    return {
        getBoard,
        playerMove,
        printBoard,
        resetBoard
    };
})();

const Player = (name, token) => {

    const getName = () => name;
    const getToken = () => token;

    return {
        getName,
        getToken
    };
};


const GameController = (() => {

    let players = [];
    let activePlayer;

    const createPlayer = (name) => {
        if(players.length === 3) {return;};
        let newPlayer = players[0] ? Player(name, 2) : Player(name, 1);
        players.push(newPlayer);
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const newGame = () => {
        GameBoard.resetBoard();
        activePlayer = players[0];
        printNewRound();
    };

    const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkIfWin = () => {
        let board = GameBoard.printBoard();
        let activePlayerToken = activePlayer.getToken();
        let result = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            if( board[winningCombinations[i][0]] === activePlayerToken && 
                board[winningCombinations[i][1]] === activePlayerToken && 
                board[winningCombinations[i][2]] === activePlayerToken){
                    result = true;
                    break;
            }else{
                result = false;
            }
        }
        return result;
    };

    const printNewRound = () => {
        let board = GameBoard.printBoard();
        console.log(activePlayer.getName() + "'s Turn");
        console.log(board[0] + " " + board[1] + " " + board[2] + "\n" +
                    board[3] + " " + board[4] + " " + board[5] + "\n" +
                    board[6] + " " + board[7] + " " + board[8]
        );
    };

    const playRound = (index) => {
        let activePlayerToken = getActivePlayer().getToken();
        let moveValid = GameBoard.playerMove(index, activePlayerToken);

        if(moveValid){
            let isWinner = checkIfWin();
            if(isWinner === true){
                console.log(getActivePlayer().getName() + " Won");
            }else{
                switchPlayerTurn();
                printNewRound();
            }
        }else{
            printNewRound();
        }
        
    };

    return {
        createPlayer,
        newGame,
        printNewRound,
        playRound,
        checkIfWin
    };
})();
