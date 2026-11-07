# Bulls and Cows — Design Documentation

## 1. Data Structures and Algorithms

### Game State
We use a GameState object to store information about the current game.

It contains the secret number (secret), code length (length), number system (base), start time (startedAt), and guess history (history).

Keeping this data in one object makes the code easier to read and manage.

### Guess History

We use an array to store all guesses.

Each guess contains the entered code, the number of bulls, and the number of cows.

We use the spread operator (`...`) to add new guesses without changing the original array. This follows the principle of immutability.

### Leaderboard

We use an array of `GameRecord` objects to store game results.

Each record contains the number system, code length, number of attempts, and completion time.

Records are saved in `localStorage` and sorted by the number of attempts and completion time.

Only the best 10 records are kept.

### Evaluate Guess Algorithm

The `evaluateGuess()` function compares the secret code with the player's guess.

First, it counts bulls — digits in the correct positions.

Then, it counts cows — correct digits in different positions.

The function returns the number of bulls and cows.

### Count Possible Secrets Algorithm

The `countPossibleSecrets()` function calculates how many different secret codes are possible.

It uses recursion to calculate the result step by step.

It also uses memoization to save previous results and avoid repeated calculations.

This makes the function more efficient.

## 2. Time Complexity (Big O)

### evaluateGuess()

**Time Complexity: O(n²)**

The function compares the secret code with the player's guess.

It uses `filter()` to count bulls and cows.

To count cows, it uses `includes()` inside `filter()`. Both operations take O(n) time.

Because these operations are nested, the total time complexity is O(n²).

Here, `n` is the number of digits in the code.
### generateSecret()

**Time Complexity: O(n × b)**

The function generates a secret code with unique digits.

It uses a loop to select `n` digits.

After each selection, it removes the selected digit using `slice()`. Copying the remaining characters takes up to O(b) time.

Here, `n` is the code length and `b` is the number of available digits.

### countPossibleSecrets()

**Time Complexity: O(n)**

The function uses recursion to count possible secret codes.

Each recursive call decreases the code length by one.

It uses a `Map` to cache previous results. Repeated calculations can return cached results in O(1) time.

Here, `n` is the code length.

### isValidGuess()

**Time Complexity: O(n)**

The function checks the code length, allowed characters, and repeated digits.

It uses `Set` to check unique digits and `every()` to validate characters.

Both operations take O(n) time, so the total time complexity is O(n).

Here, `n` is the length of the guess.

### createDigitValidator()

**Time Complexity: O(1)**

The function creates a validator for the selected number system.

The validator checks if a digit is allowed in that number system.

The number of available digits is limited to 16, so the validation time is constant.

## 3. Clean Code Principles

### Single Responsibility Principle

Each function has one main responsibility.

For example, `generateSecret()` creates a secret code, `evaluateGuess()` counts bulls and cows, and `isValidGuess()` validates user input.

Game logic is separated from DOM updates, which makes the code easier to test and maintain.

### Meaningful Names

We use clear and descriptive names for functions and variables.

For example, `generateSecret()` creates a secret code, `evaluateGuess()` checks a guess, and `countPossibleSecrets()` calculates the number of possible codes.

These names make the code easier to read and understand.

### DRY (Don't Repeat Yourself)

We avoid repeating the same logic in different parts of the application.

For example, `createDigitValidator()` provides reusable digit validation for different number systems.

This makes the code easier to maintain and update.