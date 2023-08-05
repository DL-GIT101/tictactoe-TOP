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
    };

    const printNewRound = () => {
        GameBoard.printBoard();
        console.log(activePlayer.getName() + "'s Turn");
    };

    const playRound = (index) => {
        GameBoard.playerMove(index, getActivePlayer().getToken());



        switchPlayerTurn();
        printNewRound();
    };

    return {
        createPlayer,
        newGame,
        printNewRound,
        playRound
    };
})();
