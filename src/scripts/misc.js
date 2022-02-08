import { shipFactory, gameboardFactory } from './gamecore';

const sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let takenNums = [];

const helper = (() => {
  const addTaken = (num) => {
    // wont add unnecessary numbers
    if (num < 0 || num > 99) return;
    const posxy = { x: num % 10, y: Math.floor(num / 10) };

    if (posxy.x > 9 || posxy.y > 9) return;
    takenNums.push(num);
  };

  const getHorizontalPos = (size) => {
    let pos;
    do {
      pos = Math.floor(Math.random() * 100);
    } while (takenNums.some((e) => e >= pos && e <= pos + size)); // if in range

    // if off too big
    if ((pos % 10) + size - 1 > 9) return getHorizontalPos(size);

    // registers surrounding
    for (let i = pos - 1; i < pos + size + 1; i++) {
      addTaken(i - 10);
      addTaken(i);
      addTaken(i + 10);
    }
    return pos;
  };
  const getVerticalPos = (size) => {
    function isTaken(num) {
      for (let i = num; i < num + size * 10; i += 10)
        if (takenNums.includes(i)) return true;
      return false;
    }
    let pos;
    do {
      pos = Math.floor(Math.random() * 100);
    } while (isTaken(pos));

    // if off too big
    if (Math.floor(pos / 10) + size - 1 > 9) return getVerticalPos(size);

    // registers surrounding
    for (let i = pos - 10; i < pos + size * 10 + 10; i += 10) {
      addTaken(i - 1);
      addTaken(i);
      addTaken(i + 1);
    }
    return pos;
  };
  return { addTaken, getHorizontalPos, getVerticalPos };
})();

const getRandomBoard = () => {
  const board = gameboardFactory();
  takenNums = [];

  sizes.forEach((size) => {
    // horizontal
    const isHorizontal = Math.random() < 0.5; // 50% true 50% false

    if (isHorizontal) {
      const pos = helper.getHorizontalPos(size);
      board.shipPlace(shipFactory(size, pos % 10, Math.floor(pos / 10), true));
    } else {
      const pos = helper.getVerticalPos(size);
      board.shipPlace(shipFactory(size, pos % 10, Math.floor(pos / 10), false));
    }
  });

  return board;
};

export { getRandomBoard };
