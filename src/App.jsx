import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [xIsNext, setXIsNext] = React.useState(true);
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [numMoves, setNumMoves] = React.useState(0.0);
  const [selectedPieceIndex, setSelectedPieceIndex] = React.useState(null);

  function handleClick(i) {
    if (calculateWinner(squares) || (squares[i] && numMoves < 3.0) ) {
      return;
    }
    const nextSquares = squares.slice();

    if(numMoves < 3.0) { //normal placing
      if (xIsNext) nextSquares[i] = 'X'; 
      else nextSquares[i] = 'O';

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setNumMoves(numMoves+0.5);
    }

    else if(!selectedPieceIndex) { //3 moves done, piece not selected
      if(xIsNext && squares[i]=='X') setSelectedPieceIndex(i);
      else if(!xIsNext && squares[i]=='O') setSelectedPieceIndex(i);
      else return; //invalid square selected (doesn't corrsepond to player or empty)
    }

    else if(selectedPieceIndex) { //3 moves done, piece selected
      if(squares[i] || !isAdjacent(selectedPieceIndex, i)) { //square is taken or not adjacent
        setSelectedPieceIndex(null); //reset move
        return; 
      } 

      nextSquares[i] = squares[selectedPieceIndex];
      nextSquares[selectedPieceIndex] = null;

      if(xIsNext && squares[4]=='X' || !xIsNext && squares[4]=='O') {
          if(!calculateWinner(nextSquares) && selectedPieceIndex != 4) { //if move won't win the game and you don't vacate center
            setSelectedPieceIndex(null); //reset move
            return; 
          }
      }

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setNumMoves(numMoves+0.5);
      setSelectedPieceIndex(null);
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  let selectedStatus;
  if(selectedPieceIndex) selectedStatus = "Square " + (selectedPieceIndex+1) + " selected."
  else selectedStatus = "No square selected"

  return (
    <div className="container py-4">
      <Card className="starter-card shadow-sm">
        <Card.Body className="p-4"> 
          <div className="status">{status}</div>
          <div className="status">{selectedStatus}</div>
          <div className="status">Num moves: {numMoves}</div>
          <div className="board-row">
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
        </Card.Body>
      </Card>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isAdjacent(pieceIndex, toMoveIndex) {
  const adjacentSquares = [
    [1, 3, 4],
    [0, 2, 3, 4, 5],
    [1, 4, 5],
    [0, 1, 4, 6, 7],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [1, 2, 4, 7, 8],
    [3, 4, 7],
    [3, 4, 5, 6, 8],
    [4,5,7],
  ];
  const adjacencyList = adjacentSquares[pieceIndex];
  for (let i = 0; i < adjacencyList.length; i++) {
    if(toMoveIndex == adjacencyList[i]) return true;
  }
  return false;
}