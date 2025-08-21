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

    let Player1,Player2, currentPlayer;

    const playRound = (index) => {

        console.log(currentPlayer);
        if (GameBoard.setMark(index,currentPlayer.mark) === true) {
            console.log(currentPlayer.mark);
            console.log(currentPlayer);
            const playerDiv = document.querySelector(`.cell[data-index="${index}"]`);
            console.log(playerDiv);
            playerDiv.textContent = currentPlayer.mark;
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
            return;
        }
        switchPlayer();
        computerMove();
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
        const emptyIndex = []
        let emptyCell = GameBoard.getBoard().indexOf("");
        while (emptyCell !== -1) {
            emptyIndex.push(emptyCell);
            emptyCell = GameBoard.getBoard().indexOf("", emptyCell + 1);
        }
        
        const computerIndex = emptyIndex[Math.floor(Math.random() * emptyIndex.length)];
        GameBoard.setMark(computerIndex, currentPlayer.mark);
        const computerDiv = document.querySelector(`.cell[data-index="${computerIndex}"]`);
        computerDiv.textContent = currentPlayer.mark;
        console.log (`${currentPlayer.name} placed ${currentPlayer.mark} at position ${computerIndex}`);
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
        switchPlayer();
    };
    
    const chooseTurn = (name,number) => {
        if (name === "computer") {
            console.log("choose another name");
            return;
        }

        if (number === 1) {
            Player1 = Player(name,"x");
            Player2 = Player("Computer","o");
            currentPlayer = Player1;
            console.log("player1 =", Player1);
            console.log("player2 =", Player2);
            console.log("Currentplayer =", currentPlayer);
            console.log(GameBoard.getBoard());
        } else {
            Player1 = Player("Computer", "x");
            Player2 = Player(name, "o");
            currentPlayer = Player1;
            console.log("Currentplayer =", currentPlayer);
            computerMove();
            console.log("player1=", Player1);
            console.log("player2 =", Player2);
            console.log("Currentplayer =", currentPlayer);
            console.log(GameBoard.getBoard());
        }
    };

    return {chooseTurn, playRound};
}) ();

const btn = document.querySelector(".cell");
const btns = document.querySelectorAll("button");

Game.chooseTurn("Ariff",1);

btns.forEach(btn => {
    btn.addEventListener ("click", ()=> {
    const btnIndex = btn.getAttribute("data-index");
    console.log(btnIndex);
    Game.playRound(btnIndex);
});
});



