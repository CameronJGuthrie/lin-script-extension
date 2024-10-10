import { ArgumentMetadata } from "./string-util";

type LinscriptFunctionName =
  | "Background"
  | "Camera"
  | "Interaction"
  | "Item"
  | "Movie"
  | "Script"
  | "Sound"
  | "Speaker"
  | "Sprite"
  | "Voice";

type LinscriptValueMap = { [key: number]: string };

type LinscriptFunctionParameter = {
  name: string;
  unknown?: true;
  unused?: true;
  values?: LinscriptValueMap;
  handler?: (args: ArgumentMetadata[]) => string;
};

export type LinscriptFunction = {
  name: LinscriptFunctionName;
  parameters: LinscriptFunctionParameter[];
};
