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
        let result;
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

        function checkToken(token) {
            return token >= 1;
        }
        let allTaken = board.every(checkToken);
        if(allTaken === true){
            result = "draw";
        }

        return result;
    };

    const printNewRound = () => {
        let board = GameBoard.printBoard();
        return board;
    };

    const playRound = (index) => {
        let activePlayerToken = getActivePlayer().getToken();
        let moveValid = GameBoard.playerMove(index, activePlayerToken);

        if(moveValid){
            let isWinner = checkIfWin();
            if(isWinner === true){
                return "winner";
            }else if(isWinner === "draw"){
                return "draw";
            }else{
                switchPlayerTurn();
                printNewRound();
                return "next";
            }
        }else{
            printNewRound();
            return "taken";
        }
        
    };

    return {
        createPlayer,
        getActivePlayer,
        printNewRound,
        newGame,
        playRound
    };
})();


const DisplayController = (() => {

    const boardDoc = document.querySelector('#board');
    const message = document.querySelector('#messageBoard');
    const header = document.querySelector('header');

    const inputPlayersName = () => {
        message.innerHTML = "Input Name";

        for (let index = 1; index <= 2; index++) {
        let div = document.createElement('div');
        div.className = "input";
        let label = document.createElement('label');
        label.setAttribute("for", `player${index}`);
        label.textContent = "Player " + index;
        let input = document.createElement('input');
        input.setAttribute("type", "text");
        input.setAttribute("maxlength", "10");
        input.setAttribute("id", `player${index}`);

        div.append(label,input);
        boardDoc.appendChild(div);
        }

        let submitBTN = document.createElement('button');
        submitBTN.textContent = "Submit Players";
        submitBTN.addEventListener('click', () => {
            takePlayerNames();
        });        
        boardDoc.appendChild(submitBTN);
    };

    const takePlayerNames = () => {
        const playersInput = document.querySelectorAll('input');

        playersInput.forEach((player,index) => {
            if(player.value === ""){
                GameController.createPlayer("Player " + (index+1));
            }else{
                GameController.createPlayer(player.value);
            }
        });

        deleteBoardChild();
        startGame();
    };

    const startGame = () => {
        GameController.newGame();
        updateScreen();
        header.removeChild(header.lastChild);
    };


    const updateScreen = () => {
        deleteBoardChild();
        message.innerHTML = GameController.getActivePlayer().getName() + "'s Turn <br>";
        let board = GameController.printNewRound();

        board.forEach((cell,index) => {
            let div = document.createElement('div');
            div.setAttribute("class", "cell");
            let token = "";
            if(cell === 1){
                token = "X";
            }else if(cell === 2){
                token = "O";
            }
            div.textContent = token;
            boardDoc.appendChild(div);
            div.addEventListener('click', () => {
                tokenDrop(index);
            })
        });

    };

    const finalScreen = () => {
        deleteBoardChild();
        
        let board = GameController.printNewRound();
        board.forEach(cell => {
            let div = document.createElement('div');
            div.setAttribute("class", "cell");
            let token = "";
            if(cell === 1){
                token = "X";
            }else if(cell === 2){
                token = "O";
            }
            div.textContent = token;
            div.style.cursor = "default";
            boardDoc.appendChild(div);
        });
    };

    const tokenDrop = (index) => {
      let roundStatus = GameController.playRound(index);
      if(roundStatus === "winner"){
        finalScreen();
        message.innerHTML = GameController.getActivePlayer().getName() + " Won";
        startButton();
      }else if(roundStatus === "draw"){
        finalScreen();
        message.innerHTML = "It's a Draw";
        startButton();
      }else if(roundStatus === "next"){
        updateScreen();
      }else if(roundStatus === "taken"){
        updateScreen();
        message.innerHTML += "Grid Already Taken";
      }
        
    }

    const startButton = () => {
        let btn = document.createElement('button');
        btn.innerHTML = "New Game";
        btn.setAttribute("id", "start");
        btn.addEventListener('click', () => {
            startGame();
        })
        header.appendChild(btn);
    }

    const deleteBoardChild = () => {
        let lastChild = boardDoc.lastElementChild;
        while(lastChild){
            boardDoc.removeChild(lastChild);
            lastChild = boardDoc.lastElementChild;
        }
    };

    return {
        inputPlayersName
    };
})();

DisplayController.inputPlayersName();