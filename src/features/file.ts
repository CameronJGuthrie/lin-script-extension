import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

const WAD_DIR = "C:/Users/Cameron/Desktop/Danganronpa/wads";
const STEAM_DIR = "C:/Program Files (x86)/Steam/steamapps/common/Danganronpa Trigger Happy Havoc";

export function convertToLinscript(uri: vscode.Uri) {
  console.log("convertToLinscript");

  const linFilePath = uri.fsPath;
  const linscriptFilePath = linFilePath.replace(/\.lin$/, ".linscript");

  // Execute the command in the background
  const command = "lin_compiler";
  const args = ["-d", linFilePath, linscriptFilePath];

  const child = spawn(command, args, {
    shell: true,
    cwd: path.dirname(linFilePath),
  });

  child.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`Process exited with code ${code}`);
  });
}

export function convertToLin(uri: vscode.Uri) {
  console.log("convertToLin");

  const linscriptFilePath = uri.fsPath;
  const linFilePath = linscriptFilePath.replace(/\.linscript$/, ".lin");

  fs.access(linscriptFilePath, fs.constants.R_OK, (err) => {
    if (err) {
      // File is not accessible (likely in use), log and give up
      console.log(`File is in use or cannot be accessed: ${linscriptFilePath}`);
      return;
    }

    // Execute the command in the background
    const command = "lin_compiler";
    const args = [linscriptFilePath, linFilePath];

    const child = spawn(command, args, {
      shell: true,
      cwd: path.dirname(linscriptFilePath),
    });

    child.stdout.on("data", (data) => {
      console.log(`Output: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    child.on("close", (code) => {
      console.log(`Process exited with code ${code}`);
      if (code === 0) {
        moveLinToWadCollection(linFilePath);
      }
    });
  });
}

function moveLinToWadCollection(linscriptFilePath: string) {
  const targetDir = "C:/Users/Cameron/Desktop/Danganronpa/wads/dr1_data_us/Dr1/us/script";
  const targetFilePath = path.join(targetDir, path.basename(linscriptFilePath));

  // Check if the target directory exists; if not, create it
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Move the file to the target directory
  fs.copyFileSync(linscriptFilePath, targetFilePath);

  compileWad(WAD_DIR);
}

// Function to compile .wad files using the rewad command
function compileWad(wadsDir: string) {
  const command = "rewad";

  const child = spawn(command, {
    shell: true,
    cwd: wadsDir, // Run the command in the specified compileDir
  });

  child.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`Process exited with code ${code}`);
    if (code === 0) {
      // Move .wad files after successful compilation
      moveWadsToSteam(wadsDir, STEAM_DIR);
    }
  });
}

// Function to move .wad files to the target Steam directory
function moveWadsToSteam(sourceDir: string, targetDir: string) {
  // Find all .wad files in the source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(`Failed to read directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith(".wad")) {
        const sourceFilePath = path.join(sourceDir, file);
        const targetFilePath = path.join(targetDir, file);

        // Move the file to the target directory
        fs.rename(sourceFilePath, targetFilePath, (err) => {
          if (err) {
            console.error(`Failed to move file ${file}: ${err}`);
          } else {
            console.log(`Moved ${file} to ${targetDir}`);
          }
        });
      }
    });
  });
}
