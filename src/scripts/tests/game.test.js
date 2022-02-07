import { shipFactory, gameboardFactory } from '../gamecore';
// TODO: create real jest mocks
test('Ship destroy', () => {
  const shipmock = shipFactory(3, 0, 0, true);
  shipmock.hit();
  shipmock.hit();
  shipmock.hit();
  expect(shipmock.isSunk()).toBe(true);
});

describe('gameboard', () => {
  const gameboardmock = gameboardFactory();
  gameboardmock.shipPlace(shipFactory(3, 0, 0, true));

  test('Ship take hit', () => {
    expect(gameboardmock.reciveAttack(0, 0)).toBe('hit');
  });
  test('Dont lose game', () => {
    expect(gameboardmock.checkLoss()).toBe(false);
  });
  test('Miss', () => {
    expect(gameboardmock.reciveAttack(3, 0)).toBe('miss');
  });
  test('Destroy ship', () => {
    gameboardmock.reciveAttack(1, 0);
    gameboardmock.reciveAttack(2, 0);
    expect(gameboardmock.getSunk()).toEqual([
      {
        x: 0,
        y: 0,
        length: 3,
        isHorizontal: true,
      },
    ]);
  });
  test('Lose game', () => {
    expect(gameboardmock.checkLoss()).toBe(true);
  });
});
