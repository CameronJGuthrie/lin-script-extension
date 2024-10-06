import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { createCompleteFunctionRegex, createIncompleteFunctionRegex } from "../regex-help";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  // vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test("full parameter regex", () => {
    // Given
    const getRegex = () => createCompleteFunctionRegex("Movie", 2);

    // When/ Then
    assert.match("Movie(1, 0)", getRegex());
    assert.match("Movie(1, 0)  ", getRegex());
    assert.match("Movie(1  ,   0)  ", getRegex());
    assert.doesNotMatch("Movie", getRegex());
    assert.doesNotMatch("Movie(", getRegex());
    assert.doesNotMatch("Movie(1, 2", getRegex());
    assert.doesNotMatch("Movie(1, 2, 3)", getRegex());
  });

  test("partial parameter regex", () => {
    // Given
    const getRegex = () => createIncompleteFunctionRegex("Movie", 2);

    // When/ Then
    assert.match("Movie", getRegex());
    assert.match("Movie(", getRegex());
    assert.match("\nMovie", getRegex());
    assert.match("\nMovie(", getRegex());

    assert.match("\nMovie(1, 0)\nMovie  \n0x25(6, 1)", getRegex());
    assert.strictEqual(getRegex().exec("\nMovie(1, 0)\nMovie  \n0x25(6, 1)")?.[0], "Movie");
  });
});
