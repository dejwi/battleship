import { shipHover, doShipColide, checkSize, addClasses } from './dom';
import { gameboardFactory, shipFactory } from './gamecore';

function testBoard() {
  const gameboardmock = gameboardFactory();
  gameboardmock.shipPlace(shipFactory(3, 0, 0, true));
  gameboardmock.shipPlace(shipFactory(5, 9, 0, false));
  gameboardmock.shipPlace(shipFactory(1, 2, 4, false));
  gameboardmock.shipPlace(shipFactory(4, 0, 9, true));
  gameboardmock.shipPlace(shipFactory(4, 5, 6, true));
  gameboardmock.shipPlace(shipFactory(4, 4, 1, false));
  return gameboardmock;
}

const playerBoard = gameboardFactory();
const enemyBoard = testBoard();

let gameStart = true;
function initPlayerStart() {
  const sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
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
            e.target.getAttribute('data-x'),
            e.target.getAttribute('data-y'),
            isHorizontal
          )
        );
        curr++;
        if (curr >= sizes.length) gameStartEnd();
      }
  });
}
function gameStartEnd() {
  gameStart = false;
  document.querySelector('.rotate').classList.add('hide');
}

function initGame() {
  document.querySelector('.enemy').addEventListener('click', (e) => {
    if (!e.target.classList.value.includes('gameboard')) {
      if (e.target.classList.value) return;
      const x = +e.target.getAttribute('data-x');
      const y = +e.target.getAttribute('data-y');
      e.target.classList = enemyBoard.reciveAttack(x, y);
      // console.log({ won: enemyBoard.checkLoss(), sunk: enemyBoard.getSunk().length });
    }
  });
}

function gameplayHandler() {
  initPlayerStart();
  initGame(); // debug
}

export { gameplayHandler };
