import { LinscriptFunction } from "../shared/types";

export const sound: LinscriptFunction = {
  name: "Sound",
  parameters: [
    {
      name: "",
      unknown: true,
    },
    {
      name: "soundId",
      values: {
        219: "Metal Plate Bang Bang",
      },
    },
    {
      name: "volume",
    },
  ],
};
