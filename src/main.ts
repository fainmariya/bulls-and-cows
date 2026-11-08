import { generateSecret } from "./game/generateSecret.js";
import type { GameState, GameRecord } from "./game/types.js";
import { createDigitValidator } from "./game/createDigitValidator.js";
import { isValidGuess } from "./game/isValidGuess.js";
import { evaluateGuess } from "./game/evaluateGuess.js";
import { loadRecords, saveRecords, sortRecords } from "./game/leaderboard.js";

const appContainer = document.createElement("main");
appContainer.className = "app-container";

document.body.append(appContainer);

const titleGame = document.createElement("h1");
titleGame.textContent = "Bulls and Cows";
appContainer.append(titleGame);
const settingsContainer = document.createElement("div");
settingsContainer.className = "game-settings";

appContainer.append(settingsContainer);
const lengthSelect = document.createElement("select");
lengthSelect.id = "secret-length";
lengthSelect.name = "secretLength";

const lengthLabel = document.createElement("label");
lengthLabel.htmlFor = "secret-length";
lengthLabel.textContent = "Code length";
const lengthField = document.createElement("div");
lengthField.className = "settings-field";

lengthField.append(lengthLabel, lengthSelect);
settingsContainer.append(lengthField);

for (let length = 2; length <= 6; length++) {
  const option = document.createElement("option");

  option.value = String(length);
  option.textContent = String(length);

  lengthSelect.append(option);
}
const baseSelect = document.createElement("select");
baseSelect.id = "number-base";
baseSelect.name = "numberBase";

const baseLabel = document.createElement("label");
baseLabel.htmlFor = "number-base";
baseLabel.textContent = "Number system";

const baseField = document.createElement("div");
baseField.className = "settings-field";

baseField.append(baseLabel, baseSelect);
settingsContainer.append(baseField);
const numberBases = [
  { label: "Binary (bin)", value: "2" },
  { label: "Octal (oct)", value: "8" },
  { label: "Decimal (dec)", value: "10" },
  { label: "Hexadecimal (hex)", value: "16" },
];
numberBases.forEach((base) => {
  const option = document.createElement("option");
  option.value = base.value;
  option.textContent = base.label;
  baseSelect.append(option);
});

const startButton = document.createElement("button");
startButton.type = "button";
startButton.textContent = "Start Game";
startButton.className = "btn btn-primary";

const newGameButton = document.createElement("button");
newGameButton.type = "button";
newGameButton.textContent = "New Game";
newGameButton.disabled = true;
newGameButton.className = "btn btn-secondary";

const submitButton = document.createElement("button");
submitButton.type = "button";
submitButton.textContent = "Submit Guess";
submitButton.id = "submit-guess";
submitButton.className = "btn btn-primary";

const buttonsContainer = document.createElement("div");
buttonsContainer.className = "game-buttons";

buttonsContainer.append(startButton, newGameButton, submitButton);
appContainer.append(buttonsContainer);
let gameState: GameState | null = null;

startButton.addEventListener("click", () => {
  const length = Number(lengthSelect.value);
  const base = Number(baseSelect.value);
  const secret = generateSecret(length, base);
  gameState = {
    secret,
    length,
    base,
    history: [],
    startedAt: Date.now(),
  };
  submitButton.disabled = false;
  startButton.disabled = true;
  lengthSelect.disabled = true;
  baseSelect.disabled = true;
  newGameButton.disabled = false;
});
const guessContainer = document.createElement("div");
guessContainer.id = "guess-container";

appContainer.append(guessContainer);

const errorMessage = document.createElement("p");
errorMessage.id = "guess-error";
errorMessage.setAttribute("role", "alert");
const historyContainer = document.createElement("div");
historyContainer.id = "guess-history";

appContainer.append(historyContainer);

guessContainer.after(errorMessage);
renderGuessCells();

lengthSelect.addEventListener("change", () => {
  renderGuessCells();
});
baseSelect.addEventListener("change", updateLengthOptions);

updateLengthOptions();

submitButton.addEventListener("click", () => {
  if (gameState === null) {
    return;
  }
  const guess = getGuess();
  const isValid = isValidGuess(guess, gameState.length, gameState.base);
  if (!isValid) {
    errorMessage.textContent =
      "Invalid guess. Check the length and repeated digits.";
    return;
  }
  const alreadyGuessed = gameState.history.some((item) => item.guess === guess);
  console.log("Duplicate check:", {
    guess,
    history: gameState.history,
    alreadyGuessed,
  });
  if (alreadyGuessed) {
    errorMessage.textContent =
      "You've already tried this combination. Try another one.";
    return;
  }
  const result = evaluateGuess(gameState.secret, guess);
  errorMessage.textContent = "";
  const historyItem = document.createElement("p");

  historyItem.textContent = `Guess: ${guess} | Bulls: ${result.bulls} | Cows: ${result.cows}`;

  historyContainer.append(historyItem);
  gameState = {
    ...gameState,
    history: [
      ...gameState.history,

      {
        guess,
        bulls: result.bulls,
        cows: result.cows,
      },
    ],
  };
  if (result.bulls === gameState.length) {
    const elapsedMs = Date.now() - gameState.startedAt;
    const elapsedSeconds = (elapsedMs / 1000).toFixed(1);
    const newRecord: GameRecord = {
      base: gameState.base,
      length: gameState.length,
      attempts: gameState.history.length,
      timeMs: elapsedMs,
    };
    const records = loadRecords();

    const updatedRecords = sortRecords([...records, newRecord]).slice(0, 10);

    saveRecords(updatedRecords);
    errorMessage.textContent = `Congratulations! You won in ${gameState.history.length} attempts! Time: ${elapsedSeconds}s`;
    submitButton.disabled = true;
  }
});
newGameButton.addEventListener("click", () => {
  gameState = null;

  lengthSelect.disabled = false;
  baseSelect.disabled = false;

  startButton.disabled = false;
  newGameButton.disabled = true;
  submitButton.disabled = true;

  historyContainer.replaceChildren();
  errorMessage.textContent = "";

  renderGuessCells();
});
function renderGuessCells(): void {
  guessContainer.replaceChildren();
  errorMessage.textContent = "";
  const length = Number(lengthSelect.value);
  const base = Number(baseSelect.value);
  const isValidDigit = createDigitValidator(base);
  for (let i = 0; i < length; i++) {
    const guessCell = document.createElement("input");
    guessCell.type = "text";
    guessCell.maxLength = 1;
    guessCell.autocomplete = "off";
    guessCell.addEventListener("input", () => {
      const digit = guessCell.value;

      if (!isValidDigit(digit)) {
        guessCell.value = "";
        errorMessage.textContent = `Invalid digit for base ${base}`;
        return;
      }
      errorMessage.textContent = "";
      const nextCell = guessCell.nextElementSibling;

      if (nextCell instanceof HTMLInputElement) {
        nextCell.focus();
      }
    });
    guessCell.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && guessCell.value === "") {
        const previousCell = guessCell.previousElementSibling;

        if (previousCell instanceof HTMLInputElement) {
          previousCell.value = "";
          previousCell.focus();
        }
      }
    });
    guessContainer.append(guessCell);
  }
}
function updateLengthOptions(): void {
  const selectedBase = Number(baseSelect.value);
  const lengthOptions = lengthSelect.querySelectorAll("option");

  lengthOptions.forEach((option) => {
    const length = Number(option.value);
    option.disabled = length > selectedBase;
  });
  if (Number(lengthSelect.value) > selectedBase) {
    lengthSelect.value = String(selectedBase);
  }
  renderGuessCells();
}
function getGuess(): string {
  const cells = guessContainer.querySelectorAll("input");

  return Array.from(cells)
    .map((cell) => cell.value)
    .join("");
}
const leaderboardDialog = document.createElement("dialog");
leaderboardDialog.id = "leaderboard-dialog";

document.body.append(leaderboardDialog);
const leaderboardButton = document.createElement("button");
leaderboardButton.type = "button";
leaderboardButton.textContent = "🏆 Leaderboard";
leaderboardButton.className = "btn btn-leaderboard";

appContainer.append(leaderboardButton);

const leaderboardTitle = document.createElement("h2");
leaderboardTitle.textContent = "🏆 Leaderboard";

const closeLeaderboardButton = document.createElement("button");
closeLeaderboardButton.type = "button";
closeLeaderboardButton.textContent = "✕";
leaderboardButton.addEventListener("click", () => {
  renderLeaderboard();
  leaderboardDialog.showModal();
});

leaderboardDialog.append(leaderboardTitle, closeLeaderboardButton);
closeLeaderboardButton.addEventListener("click", () => {
  leaderboardDialog.close();
});
const leaderboardContent = document.createElement("div");
leaderboardContent.id = "leaderboard-content";

leaderboardDialog.append(leaderboardContent);
function renderLeaderboard(): void {
  const records = sortRecords(loadRecords());

  leaderboardContent.replaceChildren();

  const table = document.createElement("table");
  leaderboardContent.append(table);
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["Mode", "Length", "Attempts", "Time"];

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);
  const tbody = document.createElement("tbody");
  records.forEach((record) => {
    const row = document.createElement("tr");

    const values = [
      String(record.base),
      String(record.length),
      String(record.attempts),
      `${(record.timeMs / 1000).toFixed(1)}s`,
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    tbody.append(row);
  });
  table.append(tbody);
}
