export function generateSecret(
  length: number,
  base: number,
  random = Math.random,
): string {
  const digits = "0123456789abcdef";
  let availableDigits = digits.slice(0, base);
  let secret = "";
  if (length > availableDigits.length) {
    throw new Error('"Length exceeds available digits"');
  }
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(random() * availableDigits.length);
    const simbol = availableDigits[randomIndex];
    secret += simbol;
    availableDigits =
      availableDigits.slice(0, randomIndex) +
      availableDigits.slice(randomIndex + 1);
  }
  return secret;
}
