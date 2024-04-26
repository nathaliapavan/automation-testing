import { it } from "@jest/globals";

function sum(a, b) {
  return a + b;
}

it("should sum two values", () => {
  expect(sum(1, 1)).toBe(2);
});
