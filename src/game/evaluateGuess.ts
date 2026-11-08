export function evaluateGuess(
  secret: string,
  guess: string,
): { bulls: number; cows: number } {
  const secretDigits = [...secret];
  const guessDigits = [...guess];
  const bulls = guessDigits.filter(
    (digit, index) =>
      digit.toLowerCase() === secretDigits[index]?.toLowerCase(),
  ).length;
  const normalizedSecret = secretDigits.map((digit) => digit.toLowerCase());
  const cows = guessDigits.filter(
    (digit, index) =>
      normalizedSecret.includes(digit.toLowerCase()) &&
      digit.toLowerCase() !== normalizedSecret[index],
  ).length;
  return {
    bulls,
    cows,
  };
}
