import { generate } from "../src/client/js/app"

describe('Testing generate functionality', () => {
  test('Testing generate() function', () => {
    expect(generate).toBeDefined();
  });
});