import { shipHover, doShipColide, checkSize, addClasses } from './dom';
// import { gameboardFactory, shipFactory } from '../index';

let gameStart = true;
function initPlayerStart() {
  const sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  let curr = 0;
  const isHorizontal = true;
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
        curr++;
        if (curr >= sizes.length) gameStart = false;
      }
  });
}

function gameplayHandler() {
  initPlayerStart();
}

export { gameplayHandler };
