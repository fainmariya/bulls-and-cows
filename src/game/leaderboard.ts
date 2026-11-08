import type { GameRecord } from "./types.js";

const STORAGE_KEY = "bulls-and-cows-records";
export function saveRecords(records: GameRecord[]): void {
  const data = JSON.stringify(records);
  localStorage.setItem(STORAGE_KEY, data);
}
export function loadRecords(): GameRecord[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (data === null) {
    return [];
  }
  try {
    const parse = JSON.parse(data);
    return Array.isArray(parse) ? parse : [];
  } catch {
    return [];
  }
}
export function sortRecords(records: GameRecord[]): GameRecord[] {
  return [...records].sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }

    return a.timeMs - b.timeMs;
  });
}
