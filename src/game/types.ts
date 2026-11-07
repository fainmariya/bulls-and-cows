export interface GameState {
  secret: string;
  length: number;
  base: number;
  history: GuessResult[];
  startedAt: number;
}
export interface GuessResult {
  guess: string;
  bulls: number;
  cows: number;
}
export interface GameRecord {
  base: number;
  length: number;
  attempts: number;
  timeMs: number;
}
