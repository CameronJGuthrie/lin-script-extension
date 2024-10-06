import { LinscriptFunction } from "../linscript-functions";
import { characterIds } from "../shared/character-id";

export const voice: LinscriptFunction = {
  name: "Voice",
  parameters: [
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
    {
      name: "volume",
      unknown: true,
    },
  ],
};
