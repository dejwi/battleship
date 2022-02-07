import './styles/main.sass';
import { domMain } from './scripts/dom';

const shipFactory = (len, posx, posy, isX) => {
  const isHorizontal = isX;
  const length = len;
  const startPos = {
    x: posx,
    y: posy,
  };
  let hitCount = 0;

  const hit = () => {
    hitCount += 1;
  };

  const isSunk = () => {
    return hitCount === length;
  };

  return { length, startPos, hitCount, isSunk, isHorizontal, hit };
};

const gameboardFactory = () => {
  const sunk = [];
  const getSunk = () => {
    return sunk;
  };
  const attacked = [];

  const ships = [];
  const shipPlace = (ship) => {
    ships.push(ship);
  };

  const getShip = (x, y) => {
    // looks like shit but it works
    return ships.filter((e) => {
      if (e.isHorizontal) {
        return (
          e.startPos.x + e.length > x && e.startPos.x <= x && e.startPos.y === y
        );
      }
      return (
        e.startPos.y + e.length > y && e.startPos.y <= y && e.startPos.x === x
      );
    })[0];
  };

  const reciveAttack = (px, py) => {
    const ship = getShip(px, py);
    if (ship) {
      ship.hit();
      const shipSunk = ship.isSunk();

      if (shipSunk) {
        sunk.push({
          x: ship.startPos.x,
          y: ship.startPos.y,
          length: ship.length,
          isHorizontal: ship.isHorizontal,
        });
      }

      attacked.push({ x: px, y: py, isHit: true, isSunk: shipSunk });
      return 'hit';
    }
    attacked.push({ x: px, y: py, isHit: false, isSunk: false });
    return 'miss';
  };

  const checkLoss = () => {
    return ships.reduce((prev, now) => {
      if (prev !== 'helper') return prev.isSunk() && now.isSunk();
      return now.isSunk();
    }, 'helper');
  };
  return { shipPlace, reciveAttack, getSunk, ships, checkLoss };
};
export { shipFactory, gameboardFactory }; // for tests

domMain();

function drawEnemyShipsDebug(board = null) {
  let gameboardmock = gameboardFactory();
  gameboardmock.shipPlace(shipFactory(3, 0, 0, true));
  gameboardmock.shipPlace(shipFactory(5, 9, 0, false));
  gameboardmock.shipPlace(shipFactory(1, 2, 4, false));
  gameboardmock.shipPlace(shipFactory(4, 0, 9, true));
  gameboardmock.shipPlace(shipFactory(4, 5, 6, true));
  gameboardmock.shipPlace(shipFactory(4, 4, 1, false));

  if (board) gameboardmock = board;

  gameboardmock.ships.forEach((e) => {
    for (let i = 0; i < e.length; i++) {
      document.querySelector(
        `.enemy div[data-x="${
          e.startPos.x + (e.isHorizontal ? i : 0)
        }"][data-y="${e.startPos.y + (!e.isHorizontal ? i : 0)}"]`
      ).classList = 'pship'; // wtf
    }
  });
}
drawEnemyShipsDebug();
