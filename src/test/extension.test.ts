import * as assert from "assert";

import { createCompleteFunctionRegex, getArgumentsFromFunctionLike } from "../string-util";

suite("Extension Test Suite", () => {
  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test("full parameter regex", () => {
    // Given
    const getMovieRegex = () => createCompleteFunctionRegex("Movie", 2);
    const getSpriteRegex = () => createCompleteFunctionRegex("Sprite", 5);

    // When/ Then
    assert.match("Movie(1, 0)", getMovieRegex());
    assert.match("Movie(1, 0)  ", getMovieRegex());
    assert.match("Movie(1  ,   0)  ", getMovieRegex());
    assert.doesNotMatch("Movie", getMovieRegex());
    assert.doesNotMatch("Movie(", getMovieRegex());
    assert.doesNotMatch("Movie(1, 2", getMovieRegex());
    assert.doesNotMatch("Movie(1, 2, 3)", getMovieRegex());

    assert.match("Sprite(1, 0, 0, 0, 0)", getSpriteRegex());
    assert.match("Sprite(1 , 0, 0, 0, 0 )", getSpriteRegex());
    assert.match("Sprite(1, 0,   0, 0, 0)", getSpriteRegex());
    assert.match("Sprite( 1, 0, 0,   0,  0)", getSpriteRegex());
  });

  test("argument extractor", () => {
    assert.deepStrictEqual(getArgumentsFromFunctionLike("Movie(0, 2, 3)"), [
      [6, "0"],
      [9, "2"],
      [12, "3"],
    ]);
    assert.deepStrictEqual(getArgumentsFromFunctionLike("Movie(0, 2)"), [
      [6, "0"],
      [9, "2"],
    ]);
  });
});
