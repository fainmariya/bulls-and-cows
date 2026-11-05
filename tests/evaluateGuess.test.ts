import { describe, it, expect } from "vitest";
import { evaluateGuess } from "../src/game/evaluateGuess";

describe("evaluateGuess", () => {
  it("returns 4 bulls when all digits match in the correct positions", () => {
    expect(evaluateGuess("1234", "1234")).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it("returns 4 cows when all digits are in wrong positions", () => {
    expect(evaluateGuess("1234", "4321")).toEqual({
      bulls: 0,
      cows: 4,
    });
  });

  it("returns both bulls and cows", () => {
    expect(evaluateGuess("1234", "1354")).toEqual({
      bulls: 2,
      cows: 1,
    });
  });

  it("returns zero when no digits match", () => {
    expect(evaluateGuess("1234", "5678")).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  it("counts one bull", () => {
    expect(evaluateGuess("1234", "1567")).toEqual({
      bulls: 1,
      cows: 0,
    });
  });

  it("counts one cow", () => {
    expect(evaluateGuess("1234", "5671")).toEqual({
      bulls: 0,
      cows: 1,
    });
  });

  it("does not count bulls as cows", () => {
    expect(evaluateGuess("1234", "1243")).toEqual({
      bulls: 2,
      cows: 2,
    });
  });

  it("handles hexadecimal digits regardless of case", () => {
    expect(evaluateGuess("A1B2", "a2b3")).toEqual({
      bulls: 2,
      cows: 1,
    });
  });

  it("handles two-digit binary guesses", () => {
    expect(evaluateGuess("01", "10")).toEqual({
      bulls: 0,
      cows: 2,
    });
  });
});
