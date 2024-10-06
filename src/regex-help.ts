export function createIncompleteFunctionRegex(functionName: string, numArgs: number): RegExp {
  // Create the regex pattern for valid arguments with optional whitespace
  const argsPattern = Array(numArgs)
    .fill("\\s*\\d+\\s*") // Allow for whitespace around numbers
    .join(",\\s*"); // e.g., for 2 args: '\\s*\\d+\\s*,\\s*\\d+\\s*'

  // Match function calls ensuring the function name is a complete word
  const regexPattern = new RegExp(
    `\\b${functionName}\\b(\\s*\\(|\\s*$|(?!(\\s*\\(\\s*(${argsPattern})\\s*\\)))\\s*\\()`,
    "gm" // 'g' for global search, 'm' for multiline
  );

  return regexPattern;
}

export function createCompleteFunctionRegex(functionName: string, numArgs: number): RegExp {
  // Create the regex pattern based on the function name and the number of arguments
  const argsPattern = Array(numArgs).fill("\\s*\\d+\\s*").join(",\\s*"); // e.g., for 2 args: '\\s*\\d+\\s*,\\s*\\d+\\s*'
  const regexPattern = new RegExp(`${functionName}\\s*\\(\\s*${argsPattern}\\s*\\)`, "g");

  return regexPattern;
}

export function findIndexesOf(character: string[0], str: string): number[] {
  const indexes = [];
  for (let index = 0; index < str.length; index++) {
    if (str[index] === character) {
      indexes.push(index);
    }
  }
  return indexes;
}
