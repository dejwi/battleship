import {
  shipHover,
  doShipColide,
  checkSize,
  addClasses,
  markSunk,
} from './dom';

import { gameboardFactory, shipFactory } from './gamecore';
import { getEnemy } from './enemy';

const sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const playerBoard = gameboardFactory();
const enemyBoard = getEnemy(1);

const infoDiv = document.querySelector('.maincont>h2');

const checkForWinner = () => {
  const initEnd = () => {
    document.querySelector('.maincont').classList.add('blur');
    document.querySelector('.gameEnd').classList.remove('hidden');
  };
  const winnerDiv = document.querySelector('.gameEnd .info');

  if (playerBoard.checkLoss()) {
    winnerDiv.textContent = 'You lost:(';
    initEnd();
    return true;
  } else if (enemyBoard.board.checkLoss()) {
    winnerDiv.textContent = 'You won!';
    initEnd();
    return true;
  }
  return false;
};

const initGame = () => {
  infoDiv.textContent = 'Attack and play!';
  let currentTurn = playerBoard;

  const playerClick = (e) => {
    if (currentTurn !== playerBoard) return;
    if (!e.target.classList.value.includes('gameboard')) {
      if (e.target.classList.value) return;

      const x = +e.target.getAttribute('data-x');
      const y = +e.target.getAttribute('data-y');

      const sunk = enemyBoard.board.getSunk();
      const tempSunk = sunk.length;
      e.target.classList = enemyBoard.board.reciveAttack(x, y); // miss||hit
      if (sunk.length !== tempSunk) markSunk(sunk[sunk.length - 1], 'enemy');

      if (checkForWinner()) return; // enemy would attack after win without this return
      currentTurn = enemyBoard;
      setTimeout(() => {
        const sunkp = playerBoard.getSunk();
        const tempSunkp = sunkp.length;

        const attackPos = enemyBoard.getMove();
        document.querySelector(
          `.player div[data-x="${attackPos.x}"][data-y="${attackPos.y}"]`
        ).classList = playerBoard.reciveAttack(attackPos.x, attackPos.y);
        if (sunkp.length !== tempSunkp)
          markSunk(sunkp[sunkp.length - 1], 'player');
        if (checkForWinner()) return;

        setTimeout(() => {
          currentTurn = playerBoard;
        }, 500);
      }, 500);
    }
  };
  document.querySelector('.enemy').addEventListener('click', playerClick);
};

let gameStart = true;
const gameStartEnd = () => {
  gameStart = false;
  document.querySelector('.rotate').classList.add('hide');
  initGame();
};
const initGameStart = () => {
  let curr = 0;
  let isHorizontal = true;
  document.querySelector('.rotate').addEventListener('click', () => {
    isHorizontal = !isHorizontal;
  });

  document.querySelector('.player').addEventListener('mouseover', (e) => {
    if (!gameStart) {
      document.querySelector('.player').removeEventListener('mouseover', this);
      return;
    }
    // safety check
    if (!e.target.classList.value.includes('gameboard')) {
      shipHover(sizes[curr], e.target, isHorizontal);
    }
  });
  document.querySelector('.player').addEventListener('click', (e) => {
    if (!gameStart) {
      document.querySelector('.player').removeEventListener('click', this);
      return;
    }
    if (!e.target.classList.value.includes('gameboard'))
      if (
        !doShipColide(sizes[curr], e.target, isHorizontal) &&
        checkSize(sizes[curr], e.target, isHorizontal).check
      ) {
        addClasses(sizes[curr], e.target, true, isHorizontal, true);
        playerBoard.shipPlace(
          shipFactory(
            sizes[curr],
            +e.target.getAttribute('data-x'),
            +e.target.getAttribute('data-y'),
            isHorizontal
          )
        );
        curr++;
        if (curr >= sizes.length) gameStartEnd();
      }
  });
};

const gameplayHandler = () => {
  initGameStart();
};

export { gameplayHandler };
