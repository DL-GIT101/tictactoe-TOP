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
        board[index].changeValue(player);
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

    const twoPlayerMode = () => {
        players.splice(0,2);
        let playerOne = Player("Player One", 1);
        let playerTwo = Player("Player Two", 2);
        players.push(playerOne,playerTwo);
    };

    const aiMode = () => {
        players.splice(0,2);
        let playerOne = Player("Player One", 1);
        let playerTwo = Player("Bot", 2);
        players.push(playerOne,playerTwo);
    };


    return {
        twoPlayerMode,
        aiMode,
    };
})();
