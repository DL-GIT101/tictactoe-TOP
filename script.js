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
        players[0] = Player("Player One", 1);
        players[1] = Player("Player Two", 2);
    };

    const AiMode = () => {
        players[0] = Player("Player One", 1);
        players[1] = Player("Bot", 2);
    };

    return {

    };
})();