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