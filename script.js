const GameBoard = (function () { 
    let board = ["","","","","","","","",""];

    const getBoard = () => board;
    const setMark = (i, mark) => {if ( board[i] === "") {
        board[i] = mark;
        return true; }  else {return false;}
    };
    const reset = () => {board = ["","","","","","","","",""];};

    return {getBoard, setMark, reset};
}) ();

const Player = function (name, mark) {
    return {name, mark};
};

const Game = (function () { 
    const Player1 = Player("Ariff", "x");
    const Player2 = Player("Computer", "o");

    let currentPlayer = Player1;

    const playRound = (index) => {
        console.log(currentPlayer);
        if (GameBoard.setMark(index,currentPlayer.mark) === true) {
            console.log (`${currentPlayer.name} placed ${currentPlayer.mark} at position ${index}`);
            console.log(GameBoard.getBoard());
            if (gameOver()) {
                console.log(`${currentPlayer.name} is the winner`);
                playAgain();
                return;
            } else if (isTie()) {
                console.log(`it's tie`);
                playAgain();
                return;
            }
        } else { 
            console.log("already been fiiled. pick another spot");
        }
    };

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === Player1)? Player2 : Player1;
    };

    const gameOver = () => {
        const board = GameBoard.getBoard();
        const winPattern = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        return winPattern.some(pattern =>
            board[pattern[0]] &&
            board[pattern[0]] === board[pattern[1]] &&
            board[pattern[1]] === board[pattern[2]]
        );
    }; 

    const playAgain = () => {
        const notification = confirm("would you like to play again?");
        if (notification) {
            GameBoard.reset();
            GameBoard.getBoard();
        } else {
            return;
        }
    };

    const isTie = () => GameBoard.getBoard().every(cell => cell != "") && !gameOver();
    
    const computerMove = () => {
        const computerIndex = Math.floor(Math.random() * 9);
        playRound(computerIndex);
    }

    const playGame = (index) => {
        playRound(index);
        switchPlayer();
        computerMove();
        switchPlayer();
    }
    
    return {playGame};
}) ();


console.log(Game.playGame(1));
console.log(Game.playGame(6));
