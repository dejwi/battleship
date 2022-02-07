import { gameboardFactory, shipFactory } from './gamecore';

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

export { drawEnemyShipsDebug };
