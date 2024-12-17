import Ship from "../ship";

let ship;

beforeEach(() => {
  ship = new Ship();
});

test("length getter and setter", () => {
  ship.length = 3;
  expect(ship.length).toBe(3);
});
