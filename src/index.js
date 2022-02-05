// import "./style.scss";

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
  return { shipPlace, reciveAttack, getSunk };
};
export { shipFactory, gameboardFactory };
