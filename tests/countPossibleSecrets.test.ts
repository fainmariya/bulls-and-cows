import { describe, it, expect } from "vitest";
import { countPossibleSecrets } from "../src/game/countPossibleSecrets";

describe("possibleSecretsCount", () => {
  it("counts possible two-digit binary secrets", () => {
    const possibleSecretsCount = countPossibleSecrets(2, 2);
    expect(possibleSecretsCount).toBe(2);
  });
  it("counts possible three-digit decimal secrets", () => {
    const possibleSecretsCount = countPossibleSecrets(3, 10);
    expect(possibleSecretsCount).toBe(720);
  });
  it("counts possible three-digit octal secrets", () => {
    const possibleSecretsCount = countPossibleSecrets(3, 8);
    expect(possibleSecretsCount).toBe(336);
  });
  it("counts possible three-digit hexadecimal secrets", () => {
    const possibleSecretsCount = countPossibleSecrets(3, 16);
    expect(possibleSecretsCount).toBe(3360);
  });
  it("returns zero when length exceeds the base", () => {
    const possibleSecretsCount = countPossibleSecrets(4, 2);
    expect(possibleSecretsCount).toBe(0);
  });
});
