import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeMove, resetGame } from './features/gameSlice';
import './App.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const dispatch = useDispatch();
  
  // Select specific parts of the state for performance
  const { board, xIsNext, winner, isGameOver } = useSelector((state) => state.game);

  const handleClick = (index) => {
    dispatch(makeMove(index));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  // Determine status message
  let status;
  if (winner === 'Draw') {
    status = "It's a Draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Render Helper
  const renderSquare = (i) => (
    <Square value={board[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div className="container">
      <h1>Redux Tic Tac Toe</h1>
      <div className="status">{status}</div>
      
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;