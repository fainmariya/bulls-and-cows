import { describe, it, expect } from "vitest";
import { createDigitValidator } from "../src/game/createDigitValidator";

describe("createDigitValidator", () => {
  describe("Binary digits", () => {
    it("accepts valid binary digits", () => {
      const validate = createDigitValidator(2);
      expect(validate("0")).toBe(true);
      expect(validate("1")).toBe(true);
    });
    it("rejects invalid binary digits", () => {
      const validate = createDigitValidator(2);

      expect(validate("2")).toBe(false);
      expect(validate("a")).toBe(false);
    });
  });
  describe("Octal digits", () => {
    it("accepts valid octal digits", () => {
      const validate = createDigitValidator(8);
      expect(validate("0")).toBe(true);
      expect(validate("5")).toBe(true);
      expect(validate("7")).toBe(true);
    });
    it("rejects invalid octal digits", () => {
      const validate = createDigitValidator(8);
      expect(validate("8")).toBe(false);
      expect(validate("9")).toBe(false);
    });
  });
  describe("Decimal digits", () => {
    it("accepts valid decimal digits", () => {
      const validate = createDigitValidator(10);
      expect(validate("0")).toBe(true);
      expect(validate("5")).toBe(true);
      expect(validate("9")).toBe(true);
    });
    it("rejects invalid decimal digits", () => {
      const validate = createDigitValidator(10);
      expect(validate("a")).toBe(false);
      expect(validate("A")).toBe(false);
    });
  });
  describe("Hexadecimal digits", () => {
    it("accepts valid hexadecimal digits", () => {
      const validate = createDigitValidator(16);
      expect(validate("0")).toBe(true);
      expect(validate("5")).toBe(true);
      expect(validate("9")).toBe(true);
      expect(validate("A")).toBe(true);
      expect(validate("D")).toBe(true);
    });
    it("rejects invalid hexadecimal digits", () => {
      const validate = createDigitValidator(16);
      expect(validate("g")).toBe(false);
      expect(validate("G")).toBe(false);
    });
    it("rejects strings that are not a single character", () => {
      const validate = createDigitValidator(16);
      expect(validate("ab")).toBe(false);
      expect(validate("")).toBe(false);
    });
  });
  describe("Case-insensitive hexadecimal digits", () => {
    it("accepts both uppercase and lowercase hexadecimal letters", () => {
      const validate = createDigitValidator(16);
      expect(validate("A")).toBe(true);
      expect(validate("a")).toBe(true);
      expect(validate("f")).toBe(true);
      expect(validate("F")).toBe(true);
    });
  });
});
