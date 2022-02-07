import { shipHover, doShipColide, checkSize, addClasses } from './dom';
import { gameboardFactory, shipFactory } from './gamecore';

const playerBoard = gameboardFactory();

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

  console.log(playerBoard);
}

function gameplayHandler() {
  initPlayerStart();
}

export { gameplayHandler };
