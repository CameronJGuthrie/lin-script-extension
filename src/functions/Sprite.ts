import { LinscriptFunction } from "../linscript-functions";
import { characterIds } from "../shared/character-id";

export const sprite: LinscriptFunction = {
  name: "Sprite",
  parameters: [
    {
      name: "",
      unknown: true,
    },
    {
      name: "characterId",
      values: characterIds,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
  ],
};
