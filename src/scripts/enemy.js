import { getRandomBoard } from './misc';

const getEnemy = () => {
  const board = getRandomBoard();
  const usedMoves = [];

  let lastHits = null;
  let isHorizontal = null;

  const getRandomMove = () => {
    let move;
    do {
      move = Math.floor(Math.random() * 100);
    } while (usedMoves.includes(move));
    usedMoves.push(move);
    return { x: move % 10, y: Math.floor(move / 10) };
  };

  const getMove = () => {
    if (!lastHits) return getRandomMove();

    let checkPos = [];
    if (isHorizontal === null) checkPos = [1, -1, 10, -10];
    else if (isHorizontal) checkPos = [1, -1];
    else if (!isHorizontal) checkPos = [10, -10];

    // loop to fix bug when hit is from wrong side kinda
    let choosenHit = null;
    for (let i = 1; i < 10; i++) {
      const hit =
        lastHits[lastHits.length - i].x + lastHits[lastHits.length - i].y * 10;
      checkPos.forEach((e) => {
        if (!usedMoves.includes(hit + e) && hit + e >= 0 && hit + e <= 99)
          choosenHit = hit + e;
      });
      if (choosenHit) break;
    }
    usedMoves.push(choosenHit);
    return { x: choosenHit % 10, y: Math.floor(choosenHit / 10) };
  };

  // when destroying ship this will mark surrouing cells as attacked
  // lastPos in case when 1-cell ship is one shot | no lastHits data then
  const updateSurrounding = (lastPos) => {
    const addMoves = (e) => {
      const pos = e.x + e.y * 10;
      const posOff = [0, -10, 10];
      for (let i = 0; i < 3; i++) {
        posOff.forEach((n) => {
          if (!usedMoves.includes(pos - 1 + i + n))
            usedMoves.push(pos - 1 + i + n);
        });
      }
    };
    if (lastHits) lastHits.forEach(addMoves);
    else addMoves(lastPos);
  };
  const updateInfo = (status, data) => {
    // 'hit' || 'sunk'
    if (status === 'sunk') {
      updateSurrounding(data);
      lastHits = null;
      isHorizontal = null;
    } else if (status === 'hit') {
      if (!lastHits) lastHits = [];
      lastHits.push(data);

      if (lastHits.length >= 2 && isHorizontal === null) {
        isHorizontal = false;
        if (lastHits[lastHits.length - 1].y === lastHits[lastHits.length - 2].y)
          isHorizontal = true;
      }
    }
  };
  return { board, getMove, updateInfo };
};
export { getEnemy };
