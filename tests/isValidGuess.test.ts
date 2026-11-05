import { describe, it, expect } from "vitest";
import { isValidGuess } from "../src/game/isValidGuess";

describe("isValidGuess", () => {
  it("accepts a valid decimal guess", () => {
    const validate = isValidGuess("1234", 4, 10);
    expect(validate).toBe(true);
  });
  it("rejects a guess with incorrect length", () => {
    const result = isValidGuess("123", 4, 10);
    expect(result).toBe(false);
  });
  it("rejects duplicate digits", () => {
    const result = isValidGuess("1123", 4, 10);
    expect(result).toBe(false);
  });
  it("rejects digits outside the selected base", () => {
    const result = isValidGuess("12A4", 4, 10);
    expect(result).toBe(false);
  });
  it("accepts a valid binary guess", () => {
    expect(isValidGuess("01", 2, 2)).toBe(true);
  });

  it("accepts a valid octal guess", () => {
    expect(isValidGuess("1237", 4, 8)).toBe(true);
  });

  it("accepts a valid hexadecimal guess", () => {
    expect(isValidGuess("1aF9", 4, 16)).toBe(true);
  });
});
