import { shipFactory } from "../../index";

test("Test destroying ship", () => {
  const shipmock = shipFactory(3, 0, 0);
  shipmock.hit(1);
  shipmock.hit(2);
  shipmock.hit(3);
  expect(shipmock.isSunk()).toBe(true);
});
