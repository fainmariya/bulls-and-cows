import { createDigitValidator } from "./createDigitValidator";
export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  if (guess.length !== length) {
    return false;
  }
  const validateDigit = createDigitValidator(base);
  const chars = [...guess];
  const uniqueDigits = new Set(chars.map((char) => char.toLowerCase()));
  return chars.every(validateDigit) && uniqueDigits.size === chars.length;
}
