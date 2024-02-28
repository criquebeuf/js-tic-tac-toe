import { useState } from 'react';

// Square component representing each square in the Tic Tac Toe board
function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

// Board component representing the Tic Tac Toe board
function Board({ xIsNext, squares, onPlay}) {
  // Function to handle click event on a square
  function handleClick(i) {
    // Check if the square is already filled or if there's a winner
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Create a copy of the squares array
    const nextSquares = squares.slice();
    // Assign 'X' or 'O' based on current player's turn
    nextSquares[i] = xIsNext ? "X" : "O";
    // Call the onPlay function with updated squares
    onPlay(nextSquares);
  }

  // Calculate winner
  const winner = calculateWinner(squares);
  // Determine status message
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  // Render the board
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      {/* Render squares */}
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    </>
  );
}

// Function to calculate the winner
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
      return squares[a];
    }
  }
  return null;
}

// Game component representing the overall game
export default function Game() {
  // State variables using useState hook
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove %2 === 0;
  const currentSquares = history[currentMove];

  // Function to handle player's move
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  // Function to jump to a specific move in the game
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Generate list of moves
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

  // Render the game
  return (
    <div className="game">
      <div className="game-board">
        {/* Render the game board */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* Render the list of moves */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
