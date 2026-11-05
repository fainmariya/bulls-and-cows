export function createDigitValidator(base: number): (char: string) => boolean {
  const digits = "0123456789abcdef";
  const allowedDigits = digits.slice(0, base);
  return (char: string) => {
    return char.length === 1 && allowedDigits.includes(char.toLowerCase());
  };
}
