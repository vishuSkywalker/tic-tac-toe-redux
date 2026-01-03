import { createSlice } from '@reduxjs/toolkit';
import { calculateWinner } from '../utils/gameLogic';

// Initial State
const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
  winner: null, // 'X', 'O', 'Draw', or null
  isGameOver: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action) => {
      const index = action.payload;

      // 1. Guard clause: Ignore if square is filled or game is over
      if (state.board[index] || state.isGameOver) return;

      // 2. Update board
      state.board[index] = state.xIsNext ? 'X' : 'O';

      // 3. Check for winner
      const winner = calculateWinner(state.board);
      
      if (winner) {
        state.winner = winner;
        state.isGameOver = true;
      } else if (!state.board.includes(null)) {
        // 4. Check for Draw (no nulls left)
        state.winner = 'Draw';
        state.isGameOver = true;
      } else {
        // 5. Toggle Turn
        state.xIsNext = !state.xIsNext;
      }
    },
    resetGame: (state) => {
      // Resets state to initial values
      state.board = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
      state.isGameOver = false;
    },
  },
});

export const { makeMove, resetGame } = gameSlice.actions;
export default gameSlice.reducer;