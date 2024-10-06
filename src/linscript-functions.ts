import { movie } from "./functions/Movie";
import { setBackground } from "./functions/SetBackground";
import { speaker } from "./functions/Speaker";
import { sprite } from "./functions/Sprite";
import { voice } from "./functions/Voice";

type LinscriptFunctionName = "Voice" | "Movie" | "Script" | "Sprite" | "SetBackground" | "Speaker";
type LinscriptValueMap = { [key: number]: string };
type LinscriptFunctionParameter = {
  name: string;
  unknown?: true;
  values?: LinscriptValueMap;
};

export type LinscriptFunction = {
  name: LinscriptFunctionName;
  parameters: LinscriptFunctionParameter[];
};

export const linscriptFunctions = [voice, sprite, speaker, movie, setBackground];
