import { ArgumentMetadata } from "./string-util";

type LinscriptFunctionName = "Item" | "Voice" | "Movie" | "Script" | "Sprite" | "Background" | "Speaker";

type LinscriptValueMap = { [key: number]: string };

type LinscriptFunctionParameter = {
  name: string;
  unknown?: true;
  values?: LinscriptValueMap;
  handler?: (args: ArgumentMetadata[]) => string;
};

export type LinscriptFunction = {
  name: LinscriptFunctionName;
  parameters: LinscriptFunctionParameter[];
};
