import { useReducer } from "react";
import { createBoard, getRandomColors } from "../lib/createBoard";
import { allCellsSameColor } from "../lib/checkWin";
import { Color, GameState } from "../types/game";
import { floodFill } from "../lib/floodFill";

type Action =
  | { type: "SELECT_COLOR"; color: Color }
  | { type: "PAINT_CELL"; x: number; y: number }
  | { type: "RESET" };

const SIZE = 8;
const MAX_MOVES = 25;
const ALL_COLORS: Color[] = ['red', 'green', 'blue', 'yellow'];

const createInitialState = (): GameState => {
  const allowedColors = getRandomColors(ALL_COLORS, 3);
  const targetColor = allowedColors[Math.floor(Math.random() * allowedColors.length)];
  const board = createBoard(SIZE, allowedColors);
  return {
    board,
    allowedColors,
    targetColor,
    selectedColor: null,
    movesLeft: MAX_MOVES,
    gameOver: false,
    gameWon: false,
  };
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SELECT_COLOR":
      return { ...state, selectedColor: action.color };

    case "PAINT_CELL": {
      if (state.gameOver || state.selectedColor === null) return state;

      const boardCopy = structuredClone(state.board);
      const fromColor = boardCopy[action.x][action.y].color;
      const newBoard = floodFill(boardCopy, fromColor, state.selectedColor, action.x, action.y);

      const won = allCellsSameColor(newBoard, state.targetColor);

      return {
        ...state,
        board: newBoard,
        movesLeft: state.movesLeft - 1,
        gameWon: won,
        gameOver: won || state.movesLeft - 1 <= 0,
      };
    }


    case "RESET":
      return createInitialState();

    default:
      return state;
  }
}

export const useGameReducer = () => useReducer(reducer, createInitialState());
