import { LinscriptFunction } from "../shared/types";

export const item: LinscriptFunction = {
  name: "Item",
  parameters: [
    {
      name: "itemId",
    },
    {
      name: "",
      unknown: true, // I think one of these is quantity
    },
    {
      name: "",
      unknown: true, // I think one of these is quantity
    },
  ],
};
