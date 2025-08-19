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

console.log(GameBoard);
console.log(GameBoard.setMark(3,"x3"));
console.log(GameBoard.setMark(3,"y3"));
console.log(GameBoard.setMark(4,"y4"));
console.log(GameBoard.setMark(13,"thirteen"));
console.log(GameBoard.setMark(1,"z1"));
console.log(GameBoard.setMark(6,"y6"));
console.log(GameBoard.getBoard());
console.log(GameBoard.reset());
console.log(GameBoard.getBoard());

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
                return;
            }
            switchPlayer();
        } else { 
            console.log("already been fiiled. pick another spot");
        }
    };

    const switchPlayer = () => {
        if (currentPlayer === Player1) {
            currentPlayer = Player2;
        } else {
            currentPlayer = Player1;
            console.log(currentPlayer);
        }
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

    return {playRound};
}) ();


console.log(Game.playRound(1));
console.log(Game.playRound(7));
console.log(Game.playRound(6));
console.log(Game.playRound(5));
console.log(Game.playRound(4));
console.log(Game.playRound(3));
console.log(Game.playRound(2));
console.log(Game.playRound(8));
console.log(Game.playRound(0));