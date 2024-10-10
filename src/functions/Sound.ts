import { LinscriptFunction } from "../shared/types";

export const sound: LinscriptFunction = {
  name: "Sound",
  parameters: [
    {
      name: "",
      unknown: true,
    },
    {
      name: "sound",
      values: {
        26: "Realization Ping",
        141: "Footsteps",
        219: "Metal Plate Bang Bang",
      },
    },
    {
      name: "volume",
    },
  ],
};
