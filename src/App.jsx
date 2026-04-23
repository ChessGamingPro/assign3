import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

function Square({value, onSquareClick}) {
  return (
    <Button className='square' onClick={() => onSquareClick()}>
      {value}
    </Button>
  )
}

export default function App() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);
  
  function handleClick(index) {
    if(calculateWinner(squares) || squares[index]) return;

    const newSquares = squares.slice();

    if(xIsNext) newSquares[index] = 'X';
    else newSquares[index] = 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="container py-4">
      <Card className="starter-card shadow-sm">
        <Card.Body className="p-4"> 
          <div className='status'>{status}</div>
          <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
              <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
              <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
          </div>
          <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
              <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
              <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
          </div>
          <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
              <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
              <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
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