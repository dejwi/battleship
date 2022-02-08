import { getRandomBoard } from './misc';

const getEnemy = (difficulty) => {
  /// diff: 1-random

  const board = getRandomBoard();
  const usedMoves = [];

  const getMove = () => {
    let move;
    switch (difficulty) {
      case 1:
        do {
          move = Math.floor(Math.random() * 100);
        } while (usedMoves.includes(move));
        usedMoves.push(move);
        return { x: move % 10, y: Math.floor(move / 10) };
      default:
        throw new Error('invalid difficulty');
    }
  };

  return { board, getMove };
};
export { getEnemy };
