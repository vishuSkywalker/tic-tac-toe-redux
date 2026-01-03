import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/gameSlice';

// 1. Load from Local Storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('ticTacToeState');
    if (serializedState === null) {
      return undefined; // Let Reducers initialize state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Save to Local Storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('ticTacToeState', serializedState);
  } catch (err) {
    // Handle write errors
    console.error("Could not save state", err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  // If local storage has data, hydrate the store with it
  preloadedState: preloadedState ? { game: preloadedState } : undefined,
});

// 3. Subscribe to updates
store.subscribe(() => {
  saveState(store.getState().game);
});

export default store;