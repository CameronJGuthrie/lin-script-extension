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

export function getArgumentsFromFunctionLike(functionLike: string) {
  const regex = /(\w+)\(([^)]*)\)/; // Match function calls
  const match = regex.exec(functionLike);

  if (match) {
    const params = match[2].split(",").map((param) => param.trim()); // Split parameters by comma
    const results: [number, number][] = [];

    let currentIndex = match.index + match[0].indexOf(match[2]); // Start index of parameters

    params.forEach((param) => {
      const startIndex = functionLike.indexOf(param, currentIndex); // Find the correct start index
      results.push([startIndex, Number(param)]); // Store the start index and the parameter
      currentIndex = startIndex + param.length; // Move to the next parameter, accounting for its length
    });

    return results;
  }

  return []; // Return empty array if no match is found
}
