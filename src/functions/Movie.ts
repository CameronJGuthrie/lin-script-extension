import { LinscriptFunction } from "../shared/types";

export const movie: LinscriptFunction = {
  name: "Movie",
  parameters: [
    {
      name: "movieId",
      values: {
        0: "Danganronpa Opening",
        16: "Monokuma-TV-Intro",
      },
    },
    {
      name: "bool",
      unknown: true,
    },
  ],
};
