const add = (a,b) => a + b;
test("Should return a plus b", () => {
  const result = add(1,2);
  expect(result).toBe(3);
});