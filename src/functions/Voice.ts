import { characterIds } from "../shared/character-id";
import { LinscriptFunction } from "../shared/types";

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
      name: "soundId",
      unknown: true,
    },
    {
      name: "volume",
    },
  ],
};

export default voice;
