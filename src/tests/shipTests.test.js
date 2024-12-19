import Ship from "../ship";

let ship;

beforeEach(() => {
  ship = new Ship();
});

test("length getter and setter", () => {
  ship.length = 3;
  expect(ship.length).toBe(3);
});

test("using hit() should increment hits", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
})

test("isSunk should be true if hits = length", () =>{
    ship.length = 3;
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})