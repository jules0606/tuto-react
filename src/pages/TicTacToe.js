import { useState } from 'react';


function Square({value, onSquareClick, classSquares}) {
  return <button className={`${classSquares == 'square' ? "square" : "squareWin"}`} onClick={onSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay, currentMove, classSquares}) {
  function handleClick(i) {
        console.log(i)
    if (squares[i] ||  calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + squares[winner[0]];
    classSquares[winner[0]] = "squareWin";
    classSquares[winner[1]] = "squareWin";
    classSquares[winner[2]] = "squareWin";
  } else if (currentMove < 9){
    status = "Next player: " + (xIsNext ? "X" : "O");
  } else {
    status = "The game is a draw";
  }

  const getRows = _ => {
    let content = [];
    let squaresContent = [];
    content.push(<div key="aa" className="status">{status}</div>);
    content.push(<div key="bb" className="currentMove">current move is #{currentMove}</div>);
    for(let y=0; y < 9; y++) {
        squaresContent.push(<Square key={y} value={squares[y]} onSquareClick={() =>handleClick(y)} classSquares={classSquares[y]} />);
    }
    for (let i=0; i < 9; i=i+3) {
      content.push(<div key={i} className="board-row">{squaresContent.slice(i,i+3)}</div>);
    }
    return content;
  };

  return <>{getRows()}</>;
}

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [classSquares, setClassSquares] = useState(Array(9).fill('square'));
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setClassSquares(classSquares);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setClassSquares(Array(9).fill('square')); // Considering the last move you can go back to can't be the "winning" move
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board  xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} classSquares={classSquares} currentMove={currentMove} />
      </div>
      <div className="game-info">
         <ol>{moves.slice(0, moves.length-1)}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export default TicTacToe;