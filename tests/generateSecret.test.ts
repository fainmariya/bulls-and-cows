import { describe, it, expect, vi } from "vitest";
import { generateSecret } from "../src/game/generateSecret";
import { createDigitValidator } from "../src/game/createDigitValidator";

describe("generateSecret", () => {
  it("generates a secret with the requested length", () => {
    const secret = generateSecret(4, 10);

    expect(secret).toHaveLength(4);
  });
  it("generates a secret with unique digits", () => {
    const secret = generateSecret(4, 10);
    const uniqueDigits = new Set(secret);
    expect(uniqueDigits.size).toBe(4);
  });
  it("generates only valid binary digits", () => {
    const secret = generateSecret(2, 2);
    const validater = createDigitValidator(2);
    const chars = [...secret];
    expect(chars.every(validater)).toBe(true);
  });
  it("generates only valid octal digits", () => {
    const secret = generateSecret(4, 8);
    const validater = createDigitValidator(8);
    const chars = [...secret];
    expect(chars.every(validater)).toBe(true);
  });
  it("generates only valid hexadecimal digits", () => {
    const secret = generateSecret(4, 16);
    const validater = createDigitValidator(16);
    const chars = [...secret];
    expect(chars.every(validater)).toBe(true);
  });
  it("uses the provided random function", () => {
    const fakeRandom = vi.fn(() => 0.7);
    generateSecret(4, 16, fakeRandom);
    expect(fakeRandom).toHaveBeenCalled();
  });
  it("throws an error when length exceeds the available digits", () => {
    expect(() => generateSecret(4, 2)).toThrow();
  });
});
